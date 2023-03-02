import { Injectable } from '@nestjs/common';

@Injectable()
export class BooksService {
  private data = [];

  getAll() {
    return this.data;
  }
}
