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


import { JwelleryModule } from './main/jwellery/jwellery.module';

import { WatchModule } from './main/watch/watch.module';
import { ContactModule } from './main/contact/contact.module';

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
  ],
})
export class AppModule {}
