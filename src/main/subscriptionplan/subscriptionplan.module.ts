import { Module } from '@nestjs/common';
import { SubscriptionplanService } from './subscriptionplan.service';
import { SubscriptionplanController } from './subscriptionplan.controller';

@Module({
  controllers: [SubscriptionplanController],
  providers: [SubscriptionplanService],
})
export class SubscriptionplanModule {}
