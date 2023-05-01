import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsMongoId, IsNotEmpty } from 'class-validator';
import { BaseModel } from '../common/base.model';
import { Types } from 'mongoose';
import { Room } from '../room/room.model';

@Schema({ timestamps: true })
export class Message extends BaseModel {
  @IsNotEmpty()
  @Prop({ required: true })
  msg: string;

  @IsMongoId()
  @Prop({ type: Types.ObjectId, ref: Room.name, required: true })
  roomId: string;

  @IsMongoId()
  @Prop({ type: Types.ObjectId, required: true })
  userId: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
