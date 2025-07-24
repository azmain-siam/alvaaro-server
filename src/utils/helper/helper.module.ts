import { Module } from '@nestjs/common';
import { HelperService } from './helper.service';

@Module({
  controllers: [],
  providers: [HelperService],
  exports: [HelperService],
})
export class HelperModule {}
