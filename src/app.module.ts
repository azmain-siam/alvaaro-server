import { Module } from '@nestjs/common';
import { UserModule } from './main/user/user.module';
import { PrismaModule } from './prisma-service/prisma-service.module';
import { AuthModule } from './main/auth/auth.module';

@Module({
  imports: [UserModule, PrismaModule, AuthModule],
})
export class AppModule {}
