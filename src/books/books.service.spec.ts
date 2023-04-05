import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { Book, BookDocument } from './schemas/book.schema';
import { EditBookDto } from './dto/edit-book.dto';
import { CreateBookDto } from './dto/create-book.dto';

describe('BooksService', () => {
  let booksService: BooksService;
  let bookModel: Model<BookDocument>;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [
        BooksService,
        {
          provide: getModelToken(Book.name),
          useValue: {
            find: jest.fn(),
            findById: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            findByIdAndDelete: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    booksService = await app.resolve<BooksService>(BooksService);
    bookModel = app.get<Model<BookDocument>>(getModelToken(Book.name));
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('getAll', () => {
    it('should return all books', async () => {
      const books: Book[] = [
        {
          title: 'Test Book',
          authors: 'Test Author',
          description: 'something...',
        },
        {
          title: 'Another Book',
          authors: 'Author #2',
          description: 'more something..',
        },
      ];
      jest.spyOn(bookModel, 'find').mockResolvedValue(books as BookDocument[]);

      expect(await booksService.getAll()).toEqual(books);
      expect(bookModel.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('getById', () => {
    it('should return a book by id', async () => {
      const book = {
        title: 'Test Book',
        authors: 'Test Author',
        description: 'something...',
      };
      jest.spyOn(bookModel, 'findById').mockResolvedValue(book as BookDocument);

      expect(await booksService.getById('1')).toEqual(book);
      expect(bookModel.findById).toHaveBeenCalledTimes(1);
      expect(bookModel.findById).toHaveBeenCalledWith('1');
    });
  });

  describe('create', () => {
    it('should create a new book', async () => {
      const newBook: CreateBookDto = {
        title: 'Test Book',
        authors: 'John Doe',
        description: 'Test book description',
      };
      const createdBook = {
        _id: '1',
        ...newBook,
      } as BookDocument;
      jest
        .spyOn(booksService, 'create')
        .mockResolvedValue(createdBook as BookDocument);

      expect(await booksService.create(newBook)).toEqual(createdBook);
    });
  });

  describe('remove', () => {
    it('should remove a book by id', async () => {
      const book = {
        title: 'Test Book',
        authors: 'Test Author',
        description: 'something...',
      };
      jest
        .spyOn(bookModel, 'findByIdAndDelete')
        .mockResolvedValue(book as BookDocument);

      expect(await booksService.remove('1')).toEqual(book);
      expect(bookModel.findByIdAndDelete).toHaveBeenCalledTimes(1);
      expect(bookModel.findByIdAndDelete).toHaveBeenCalledWith('1');
    });
  });

  describe('edit', () => {
    it('should edit a book', async () => {
      const editedBook: EditBookDto = {
        title: 'Edited Book',
        authors: 'Edited Author',
        description: 'something...',
      };
      jest
        .spyOn(bookModel, 'findByIdAndUpdate')
        .mockResolvedValue(editedBook as BookDocument);

      expect(await booksService.edit('1', editedBook)).toEqual(editedBook);
      expect(bookModel.findByIdAndUpdate).toHaveBeenCalledTimes(1);
      expect(bookModel.findByIdAndUpdate).toHaveBeenCalledWith('1', editedBook);
    });
  });
});
