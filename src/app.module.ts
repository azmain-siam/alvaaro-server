import { Module } from '@nestjs/common';
import { UserModule } from './main/user/user.module';
import { PrismaServiceModule } from './main/prisma-service/prisma-service.module';

@Module({
  imports: [UserModule, PrismaServiceModule],
})
export class AppModule {}
