import { Test, TestingModule } from '@nestjs/testing';
import { JwelleryService } from './jwellery.service';

describe('JwelleryService', () => {
  let service: JwelleryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JwelleryService],
    }).compile();

    service = module.get<JwelleryService>(JwelleryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
