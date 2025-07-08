import { Module } from '@nestjs/common';
import { UserModule } from './main/user/user.module';
import { PrismaServiceModule } from './main/prisma-service/prisma-service.module';
import { AuthModule } from './main/auth/auth.module';

@Module({
  imports: [UserModule, PrismaServiceModule, AuthModule],
})
export class AppModule {}
