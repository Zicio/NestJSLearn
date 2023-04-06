import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BookCommentDocument = Bookcomment & Document;

@Schema()
export class Bookcomment {
  @Prop({ required: true })
  bookId: number;

  @Prop({ required: true })
  comment: string;
}

export const BookCommentSchema = SchemaFactory.createForClass(Bookcomment);
