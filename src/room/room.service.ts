import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { Room } from './room.model';
import { InjectModel } from '@nestjs/mongoose';
import { AddUserDto } from './dto/add-user.dto';
import { AddRoomDto } from './dto/add-room.dto';

@Injectable()
export class RoomService {
  constructor(
    @InjectModel(Room.name)
    private model: Model<Room>,
  ) {}

  addNewRoom(roomCreate: AddRoomDto) {
    const model = new this.model(roomCreate);
    return model.save();
  }

  async addUserToRoom({ roomId, userId }: AddUserDto) {
    const room = await this.model.findById(roomId);

    if (!room) {
      throw new NotFoundException('There is no Room with specified Id');
    }

    const users = new Set(room.users);
    users.add(userId);

    room.users = [...users];

    return room.save();
  }

  async checkUserExistInRoom(roomId: string, userId: string) {
    const room = await this.model.findById(roomId);

    if (!room) {
      throw new NotFoundException('There is no Room with specified Id');
    }

    const user = room.users.find((usrId) => usrId == userId);

    if (!user) {
      throw new NotFoundException(
        'Specified User dose not exist in the specified room',
      );
    }
  }
}
