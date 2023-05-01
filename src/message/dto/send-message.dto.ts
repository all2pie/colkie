import { PickType } from '@nestjs/swagger';
import { Message } from '../message.model';

export class SendMessageDto extends PickType(Message, [
  'roomId',
  'userId',
  'msg',
]) {}
