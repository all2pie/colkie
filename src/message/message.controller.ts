import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { MessageService } from './message.service';
import { ApiTags } from '@nestjs/swagger';
import { SendMessageDto } from './dto/send-message.dto';

@ApiTags('message')
@Controller('message')
export class MessageController {
  constructor(private service: MessageService) {}

  @Post('sendMessage')
  sendMessage(@Body() messageCreate: SendMessageDto) {
    return this.service.sendMessage(messageCreate);
  }

  @Get()
  getLatestMessages(@Query('roomId') roomId: string) {
    return this.service.getLatestMessages(roomId);
  }
}
