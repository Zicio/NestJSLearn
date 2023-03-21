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
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from './schemas/books.schema';
import { CreateBookDto } from './dto/create-book.dto';
import { BooksDataInterceptor } from './books.data.interceptor';
import { createBookSchema } from './validation/schemas/createBook.schema';
import { JoiValidationPipe } from './validation/joi.validation.pipe';
import { editBookSchema } from './validation/schemas/editBook.schema';
import { EditBookDto } from './dto/edit-book.dto';

@UseInterceptors(BooksDataInterceptor)
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  getAll(): Promise<Book[]> {
    return this.booksService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string): Promise<Book> {
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
