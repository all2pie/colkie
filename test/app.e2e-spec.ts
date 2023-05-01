import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import {
  NestFastifyApplication,
  FastifyAdapter,
} from '@nestjs/platform-fastify';
import { describe } from 'node:test';

describe('Colkie (e2e)', () => {
  let moduleRef: TestingModule;
  let app: NestFastifyApplication;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );

    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/').expect(200).expect('Hi :)');
  });

  describe('Add new Room', () => {
    it('handles validation properly', () => {
      request(app.getHttpServer()).post('/room/addNew').send({}).expect(400);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
