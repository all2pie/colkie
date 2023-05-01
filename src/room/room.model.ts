import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty } from 'class-validator';
import { BaseModel } from '../common/base.model';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class Room extends BaseModel {
  @IsNotEmpty()
  @Prop({ required: true })
  name: string;

  @Prop({ type: [Types.ObjectId], default: [] })
  users: string[];
}

export const RoomSchema = SchemaFactory.createForClass(Room);
