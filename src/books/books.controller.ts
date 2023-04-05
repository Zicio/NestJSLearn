import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseFilters,
  UsePipes,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from './schemas/book.schema';
import { CreateBookDto } from './dto/create-book.dto';
import { createBookSchema } from './validation/schemas/createBook.schema';
import { JoiValidationPipe } from './validation/joi.validation.pipe';
import { editBookSchema } from './validation/schemas/editBook.schema';
import { EditBookDto } from './dto/edit-book.dto';
import { HttpExceptionFilter } from './http.exception.filter';

// @UseInterceptors(BooksDataInterceptor)
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  getAll(): Promise<Book[]> {
    return this.booksService.getAll();
  }

  @UseFilters(new HttpExceptionFilter())
  @Get(':id')
  getOne(@Param('id') id: string): Promise<Book> {
    // throw new HttpException('Ошибка', 500);
    return this.booksService.getById(id);
  }

  @UsePipes(new JoiValidationPipe(createBookSchema))
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createBookDto: CreateBookDto): Promise<Book> {
    return this.booksService.create(createBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Book> {
    return this.booksService.remove(id);
  }

  @UsePipes(new JoiValidationPipe(editBookSchema))
  @Put(':id')
  edit(
    @Param('id') id: string,
    @Body() editBookDto: EditBookDto,
  ): Promise<Book> {
    return this.booksService.edit(id, editBookDto);
  }
}
