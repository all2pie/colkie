import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { RoomController } from './room/room.controller';
import { RoomService } from './room/room.service';
import { MessageService } from './message/message.service';
import { MessageController } from './message/message.controller';
import { Room, RoomSchema } from './room/room.model';
import { Message, MessageSchema } from './message/message.model';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/colkie'),
    MongooseModule.forFeature([
      {
        name: Room.name,
        schema: RoomSchema,
      },
      {
        name: Message.name,
        schema: MessageSchema,
      },
    ]),
  ],
  controllers: [AppController, RoomController, MessageController],
  providers: [RoomService, MessageService],
})
export class AppModule {}
