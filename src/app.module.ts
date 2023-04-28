import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/colkie')],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
