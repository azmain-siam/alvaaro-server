import { Module } from '@nestjs/common';
import { YachtService } from './yacht.service';
import { YachtController } from './yacht.controller';

@Module({
  controllers: [YachtController],
  providers: [YachtService],
})
export class YachtModule {}
