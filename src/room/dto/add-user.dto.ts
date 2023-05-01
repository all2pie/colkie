import { IsMongoId } from 'class-validator';

export class AddUserDto {
  @IsMongoId()
  roomId: string;

  @IsMongoId()
  userId: string;
}
