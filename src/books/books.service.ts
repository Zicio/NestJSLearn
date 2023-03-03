import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book, BookDocument } from './schemas/books.schema';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {}

  async getAll(): Promise<Book[]> {
    return this.bookModel.find().exec();
  }

  async getById(id: string): Promise<Book> {
    return this.bookModel.findById(id);
  }

  async create(bookDto: CreateBookDto): Promise<Book> {
    const newBook = new this.bookModel(bookDto);
    return newBook.save();
  }

  async remove(id: string): Promise<Book> {
    return this.bookModel.findByIdAndDelete(id);
  }

  async update(id: string, bookDto: UpdateBookDto): Promise<Book> {
    return this.bookModel.findByIdAndUpdate(id, bookDto);
  }
}
