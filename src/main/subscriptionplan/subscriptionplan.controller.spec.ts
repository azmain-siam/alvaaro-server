import { Test, TestingModule } from '@nestjs/testing';
import { SubscriptionplanController } from './subscriptionplan.controller';
import { SubscriptionplanService } from './subscriptionplan.service';

describe('SubscriptionplanController', () => {
  let controller: SubscriptionplanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubscriptionplanController],
      providers: [SubscriptionplanService],
    }).compile();

    controller = module.get<SubscriptionplanController>(
      SubscriptionplanController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
