import { Test, TestingModule } from '@nestjs/testing';
import { SubscriptionplanService } from './subscriptionplan.service';

describe('SubscriptionplanService', () => {
  let service: SubscriptionplanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubscriptionplanService],
    }).compile();

    service = module.get<SubscriptionplanService>(SubscriptionplanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
