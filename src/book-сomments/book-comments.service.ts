import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { from, Observable } from 'rxjs';
import {
  BookComment,
  BookCommentDocument,
} from './schemas/book-comment.schema';
import { CreateBookCommentDto } from './dto/create-book-сomment.dto';
import { UpdateBookCommentDto } from './dto/update-book-comment.dto';

@Injectable()
export class BookCommentsService {
  constructor(
    @InjectModel(BookComment.name)
    private bookCommentModel: Model<BookCommentDocument>,
  ) {}

  getAllBookComments(id: string): Observable<BookCommentDocument[]> {
    return from(this.bookCommentModel.find({ bookId: id })) as Observable<
      BookCommentDocument[]
    >;
  }

  createComment(
    id: string,
    createBookCommentDto: CreateBookCommentDto,
  ): Observable<BookCommentDocument> {
    const newComment = new this.bookCommentModel({
      bookId: id,
      ...createBookCommentDto,
    });
    return from(newComment.save()) as Observable<BookCommentDocument>;
  }

  updateComment(
    commentId: string,
    updateBookCommentDto: UpdateBookCommentDto,
  ): Observable<BookCommentDocument> {
    return from(
      this.bookCommentModel.findByIdAndUpdate(commentId, updateBookCommentDto),
    ) as Observable<BookCommentDocument>;
  }

  deleteComment(commentId: string): Observable<BookCommentDocument> {
    return from(
      this.bookCommentModel.findByIdAndDelete(commentId),
    ) as Observable<BookCommentDocument>;
  }

  getComment(commentId: string): Observable<BookCommentDocument> {
    return from(
      this.bookCommentModel.findById(commentId),
    ) as Observable<BookCommentDocument>;
  }
}
