import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WsResponse,
} from '@nestjs/websockets';
import { map, Observable, tap } from 'rxjs';
import { BookCommentsService } from './book-comments.service';
import { BookCommentDocument } from './schemas/book-comment.schema';
import { CreateBookCommentDto } from './dto/create-book-сomment.dto';

@WebSocketGateway({ cors: true })
export class BookCommentsGateway {
  constructor(private bookCommentsService: BookCommentsService) {}

  @SubscribeMessage('getAllComments')
  getAllComments(
    @MessageBody() obj: { id: string },
  ): Observable<WsResponse<BookCommentDocument[]>> {
    const event = 'getAllComments';
    const data$ = this.bookCommentsService.getAllBookComments(obj.id);
    return data$.pipe(
      tap(console.log),
      map((data) => ({ event, data })),
    );
  }

  @SubscribeMessage('addComment')
  addComment(
    @MessageBody() createBookCommentDto: CreateBookCommentDto,
  ): Observable<WsResponse<BookCommentDocument>> {
    const event = 'addComment';
    const data$ = this.bookCommentsService.createComment(
      String(createBookCommentDto.bookId),
      createBookCommentDto,
    );
    return data$.pipe(
      tap(console.log),
      map((data) => ({ event, data })),
    );
  }
}
