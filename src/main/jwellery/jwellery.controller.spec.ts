import { Test, TestingModule } from '@nestjs/testing';
import { JwelleryController } from './jwellery.controller';
import { JewelleryService } from './jwellery.service';

describe('JwelleryController', () => {
  let controller: JwelleryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JwelleryController],
      providers: [JewelleryService],
    }).compile();

    controller = module.get<JwelleryController>(JwelleryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
