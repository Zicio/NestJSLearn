import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book, BookDocument } from './schemas/book.schema';
import { CreateBookDto } from './dto/create-book.dto';
import { EditBookDto } from './dto/edit-book.dto';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {}

  async getAll(): Promise<BookDocument[]> {
    return this.bookModel.find();
  }

  async getById(id: string): Promise<BookDocument> {
    return this.bookModel.findById(id);
  }

  async create(bookDto: CreateBookDto): Promise<BookDocument> {
    return new this.bookModel(bookDto).save();
  }

  async remove(id: string): Promise<BookDocument> {
    return this.bookModel.findByIdAndDelete(id);
  }

  async edit(id: string, bookDto: EditBookDto): Promise<BookDocument> {
    return this.bookModel.findByIdAndUpdate(id, bookDto);
  }
}
