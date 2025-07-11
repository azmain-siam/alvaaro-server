import { Module } from '@nestjs/common';
import { JwelleryService } from './jwellery.service';
import { JwelleryController } from './jwellery.controller';

@Module({
  controllers: [JwelleryController],
  providers: [JwelleryService],
})
export class JwelleryModule {}
