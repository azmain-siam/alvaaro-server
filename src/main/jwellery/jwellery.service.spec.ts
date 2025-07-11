import { Test, TestingModule } from '@nestjs/testing';
import { JewelleryService } from './jwellery.service';

describe('JwelleryService', () => {
  let service: JewelleryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JewelleryService],
    }).compile();

    service = module.get<JewelleryService>(JewelleryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
