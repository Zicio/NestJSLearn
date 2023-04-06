import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookCommentsController } from './book-comments.controller';
import { BookCommentsService } from './book-comments.service';
import { BookComment, BookCommentSchema } from './schemas/book-comment.schema';
import { BookCommentsGateway } from './book-comments.gateway';

@Module({
  controllers: [BookCommentsController],
  providers: [BookCommentsService, BookCommentsGateway],
  imports: [
    MongooseModule.forFeature([
      { name: BookComment.name, schema: BookCommentSchema },
    ]),
  ],
})
export class BookCommentsModule {}
