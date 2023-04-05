import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import * as request from 'supertest';
import { Book, BookDocument } from './schemas/book.schema';
import { BooksModule } from './books.module';
import { EditBookDto } from './dto/edit-book.dto';
import { CreateBookDto } from './dto/create-book.dto';

describe('BooksController', () => {
  let app: INestApplication;
  const mockBookModel = {
    find: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
    create: jest.fn(),
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [BooksModule],
    })
      .overrideProvider(getModelToken(Book.name))
      .useValue(mockBookModel)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/books (GET)', () => {
    it('should return an array of books', async () => {
      const expectedResponse = [
        {
          _id: '1',
          title: 'Book 1',
          authors: 'Author 1',
          description: 'something',
        },
        {
          _id: '2',
          title: 'Book 2',
          authors: 'Author 2',
          description: 'something',
        },
      ] as BookDocument[];
      mockBookModel.find.mockResolvedValue(expectedResponse);

      const response = await request(app.getHttpServer()).get('/books');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(expectedResponse);
    });
  });

  describe('/books/:id (GET)', () => {
    it('should return a book by id', async () => {
      const expectedResponse = {
        _id: '1',
        title: 'Book 1',
        authors: 'Author 1',
        description: 'something',
      } as BookDocument;
      mockBookModel.findById.mockResolvedValue(expectedResponse);

      const response = await request(app.getHttpServer()).get('/books/1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(expectedResponse);
    });
  });

  describe('/books (POST)', () => {
    it('should create a new book', async () => {
      const createBookDto: CreateBookDto = {
        title: 'New Book',
        authors: 'New Author',
        description: 'something',
      };
      const expectedResponse = {
        _id: '1',
        title: 'New Book',
        authors: 'New Author',
        description: 'something',
      } as BookDocument;
      mockBookModel.create.mockResolvedValue(expectedResponse as BookDocument);

      const response = await request(app.getHttpServer())
        .post('/books')
        .send(createBookDto);
      expect(response.status).toBe(201);
      expect(response.body).toEqual(expectedResponse);
    });
  });

  describe('/books/:id (PUT)', () => {
    it('should change book by id', async () => {
      const editBookDto: EditBookDto = {
        title: 'New Book',
        authors: 'New Author',
        description: 'something',
      };
      const expectedResponse = {
        _id: '1',
        title: 'New Book',
        authors: 'New Author',
        description: 'something',
      } as BookDocument;
      mockBookModel.findByIdAndUpdate.mockResolvedValue(expectedResponse);

      const response = await request(app.getHttpServer())
        .put('/books/1')
        .send(editBookDto);
      expect(response.status).toBe(200);
      expect(response.body).toEqual(expectedResponse);
    });
  });

  describe('/books/:id (DELETE)', () => {
    it('should delete book by id', async () => {
      const expectedResponse = {
        _id: '1',
        title: 'New Book',
        authors: 'New Author',
        description: 'something',
      } as BookDocument;
      mockBookModel.findByIdAndDelete.mockResolvedValue(expectedResponse);

      const response = await request(app.getHttpServer()).delete('/books/1');
      expect(response.status).toBe(200);
      expect(response.body).toEqual(expectedResponse);
    });
  });
});
