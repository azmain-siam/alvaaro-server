import { Module } from '@nestjs/common';
import { CarService } from './car.service';
import { CarController } from './car.controller';
import { PrismaModule } from 'src/prisma-service/prisma-service.module';

@Module({
  imports: [PrismaModule],
  controllers: [CarController],
  providers: [CarService],
})
export class CarModule {}
