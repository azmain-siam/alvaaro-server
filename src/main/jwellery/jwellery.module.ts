import { Module } from '@nestjs/common';
import { JewelleryService } from './jwellery.service';
import { JwelleryController } from './jwellery.controller';

@Module({
  controllers: [JwelleryController],
  providers: [JewelleryService],
})
export class JwelleryModule {}
