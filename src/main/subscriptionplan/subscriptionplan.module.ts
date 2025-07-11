import { Module } from '@nestjs/common';
import { SubscriptionplanService } from './subscriptionplan.service';
import { SubscriptionplanController } from './subscriptionplan.controller';
import { PrismaModule } from 'src/prisma-service/prisma-service.module';

@Module({
  imports: [PrismaModule],
  controllers: [SubscriptionplanController],
  providers: [SubscriptionplanService],
})
export class SubscriptionplanModule {}
