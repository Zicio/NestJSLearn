import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookCommentsController } from './bookComments.controller';
import { BookCommentsService } from './bookComments.service';
import { Bookcomment, BookCommentSchema } from './schemas/bookComment.schema';

@Module({
  controllers: [BookCommentsController],
  providers: [BookCommentsService],
  imports: [
    MongooseModule.forFeature([
      { name: Bookcomment.name, schema: BookCommentSchema },
    ]),
  ],
})
export class BookCommentsModule {}
