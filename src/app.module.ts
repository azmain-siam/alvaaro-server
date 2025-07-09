import { Module } from '@nestjs/common';
import { UserModule } from './main/user/user.module';
import { PrismaServiceModule } from './main/prisma-service/prisma-service.module';
import { ContactModule } from './main/contact/contact.module';

@Module({
  imports: [UserModule, PrismaServiceModule, ContactModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
