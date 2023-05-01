import { Test, TestingModule } from '@nestjs/testing';
import { RoomService } from './room.service';
import { NotFoundException } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Room, RoomSchema } from './room.model';

describe('RoomService', () => {
  let moduleRef: TestingModule;
  let roomService: RoomService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://localhost/colkie'),
        MongooseModule.forFeature([
          {
            name: Room.name,
            schema: RoomSchema,
          },
        ]),
      ],
      controllers: [RoomService],
    }).compile();

    roomService = moduleRef.get(RoomService);
  });

  describe('Add User to Room', () => {
    it('should throw error of missing room"', async () => {
      const res = roomService.addUserToRoom({
        roomId: '644fce158867381fcb76d818',
        userId: '644fce158867381fcb76d818',
      });
      await expect(res).rejects.toThrowError(
        new NotFoundException('There is no Room with specified Id'),
      );
    });
  });
});
