import { Module } from '@nestjs/common';
import { UserModule } from './main/user/user.module';
import { PrismaModule } from './prisma-service/prisma-service.module';
import { AuthModule } from './main/auth/auth.module';
import { CarModule } from './main/car/car.module';
import { ProductModule } from './main/product/product.module';
import { SubscriptionplanModule } from './main/subscriptionplan/subscriptionplan.module';
import { NewsletterModule } from './main/newsletter/newsletter.module';
import { SellerModule } from './main/seller/seller.module';
import { JwelleryModule } from './main/jwellery/jwellery.module';
import { WatchModule } from './main/watch/watch.module';
import { ContactModule } from './main/contact/contact.module';
import { CacheModule } from '@nestjs/cache-manager';
import { RealEstateModule } from './main/real-estate/real-estate.module';
import { YachtModule } from './main/yacht/yacht.module';
import { RolesGuard } from './guards/role.guard';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guard';
import { HelperModule } from './utils/helper/helper.module';
import { PaymentModule } from './main/payment/payment.module';

@Module({
  imports: [
    UserModule,
    PrismaModule,
    AuthModule,
    CarModule,
    ProductModule,
    SubscriptionplanModule,
    NewsletterModule,
    SellerModule,
    JwelleryModule,
    WatchModule,
    ContactModule,
    CacheModule.register({
      isGlobal: true,
    }),
    RealEstateModule,
    YachtModule,

    HelperModule,

    PaymentModule,
  ],
  // providers: [
  //   {
  //     provide: APP_GUARD,
  //     useClass: AuthGuard,
  //   },
  //   {
  //     provide: APP_GUARD,
  //     useClass: RolesGuard,
  //   },
  // ],
})
export class AppModule {}
