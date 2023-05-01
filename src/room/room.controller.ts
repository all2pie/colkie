import { Body, Controller, Post } from '@nestjs/common';
import { RoomService } from './room.service';
import { AddUserDto } from './dto/add-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { AddRoomDto } from './dto/add-room.dto';

@ApiTags('room')
@Controller('room')
export class RoomController {
  constructor(private service: RoomService) {}

  @Post('addNew')
  addNewRoom(@Body() roomCreate: AddRoomDto) {
    return this.service.addNewRoom(roomCreate);
  }

  @Post('addUser')
  addUserToRoom(@Body() addUserDto: AddUserDto) {
    return this.service.addUserToRoom(addUserDto);
  }
}
