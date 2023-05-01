import { PickType } from '@nestjs/swagger';
import { Room } from '../room.model';

export class AddRoomDto extends PickType(Room, ['name']) {}
