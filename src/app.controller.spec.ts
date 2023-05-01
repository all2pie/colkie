import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';

describe('AppController', () => {
  let moduleRef: TestingModule;
  let appController: AppController;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule({
      controllers: [AppController],
    }).compile();

    appController = moduleRef.get(AppController);
  });

  describe('root', () => {
    it('should return "Hi :)"', () => {
      expect(appController.getHello()).toBe('Hi :)');
    });
  });
});
