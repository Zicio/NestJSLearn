import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { BookCommentsService } from './book-comments.service';
import { BookCommentDocument } from './schemas/book-comment.schema';
import { CreateBookCommentDto } from './dto/create-book-сomment.dto';
import { UpdateBookCommentDto } from './dto/update-book-comment.dto';
import { BookCommentsDataInterceptor } from './book-comments.data.interceptor';

@UseInterceptors(BookCommentsDataInterceptor)
@Controller('books/:id/comments')
export class BookCommentsController {
  constructor(private readonly bookCommentsService: BookCommentsService) {}

  @Get()
  getComments(@Param('id') id: string): Observable<BookCommentDocument[]> {
    return this.bookCommentsService.getAllBookComments(id);
  }

  @Post()
  createComment(
    @Param('id') id: string,
    @Body() createBookCommentDto: CreateBookCommentDto,
  ): Observable<BookCommentDocument> {
    return this.bookCommentsService.createComment(id, createBookCommentDto);
  }

  @Put(':commentId')
  updateComment(
    @Param('commentId') commentId: string,
    @Body() updateBookCommentDto: UpdateBookCommentDto,
  ): Observable<BookCommentDocument> {
    return this.bookCommentsService.updateComment(
      commentId,
      updateBookCommentDto,
    );
  }

  @Delete(':commentId')
  deleteComment(
    @Param('commentId') commentId: string,
  ): Observable<BookCommentDocument> {
    return this.bookCommentsService.deleteComment(commentId);
  }

  @Get(':commentId')
  getComment(
    @Param('commentId') commentId: string,
  ): Observable<BookCommentDocument> {
    return this.bookCommentsService.getComment(commentId);
  }
}
