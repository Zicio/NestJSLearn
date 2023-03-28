import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { Book, BookSchema } from './schemas/book.schema';

@Module({
  providers: [BooksService],
  controllers: [BooksController],
  imports: [
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
  ],
})
export class BooksModule {}
