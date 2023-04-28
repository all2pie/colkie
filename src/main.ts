import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Logger, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

export async function bootstrap(AppModule) {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  const documentConfig = new DocumentBuilder()
    .setTitle('Colkie')
    .setDescription('REST API of Colkie')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, documentConfig);
  SwaggerModule.setup('docs', app, document);

  app.listen(3000, '0.0.0.0', (error, address) => {
    if (error) {
      console.log('App Listen Error: ', error);
      process.exit(1);
    }

    Logger.verbose(address, 'Server Started');
  });
}

bootstrap(AppModule);
