import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Message } from './message.model';
import { InjectModel } from '@nestjs/mongoose';
import { RoomService } from 'src/room/room.service';
import { SendMessageDto } from './dto/send-message.dto';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name)
    private model: Model<Message>,
    private roomService: RoomService,
  ) {}

  async sendMessage(newMessage: SendMessageDto) {
    await this.roomService.checkUserExistInRoom(
      newMessage.roomId,
      newMessage.userId,
    );

    const model = new this.model(newMessage);
    return model.save();
  }

  getLatestMessages(roomId: string) {
    return this.model.find({ roomId }).sort({ createdAt: 'desc' });
  }
}
