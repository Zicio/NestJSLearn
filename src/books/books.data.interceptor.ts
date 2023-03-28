import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { catchError, map, Observable, of } from 'rxjs';
import { Book } from './schemas/book.schema';

interface IResponse {
  status: string;
  data: unknown | Error;
}

type BooksCallHandler = CallHandler<unknown>;

@Injectable()
export class BooksDataInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: BooksCallHandler,
  ): Observable<IResponse> {
    return next.handle().pipe(
      map((data: Book[]) => ({ status: 'success', data })),
      catchError((err) => of({ status: 'fail', data: err })),
    );
  }
}
