import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './main/user/user.module';
import { PrismaServiceModule } from './main/prisma-service/prisma-service.module';

@Module({
  imports: [UserModule, PrismaServiceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
