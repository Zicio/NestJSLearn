import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getAll() {
    return this.booksService.getAll();
  }
}
