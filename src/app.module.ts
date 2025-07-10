import { Module } from '@nestjs/common';
import { UserModule } from './main/user/user.module';
import { PrismaModule } from './prisma-service/prisma-service.module';
import { AuthModule } from './main/auth/auth.module';
import { CarModule } from './main/car/car.module';
import { ProductModule } from './main/product/product.module';
import { SubscriptionplanModule } from './main/subscriptionplan/subscriptionplan.module';

@Module({
  imports: [
    UserModule,
    PrismaModule,
    AuthModule,
    CarModule,
    ProductModule,
    SubscriptionplanModule,
  ],
})
export class AppModule {}
