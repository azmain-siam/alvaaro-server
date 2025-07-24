import { Module } from '@nestjs/common';
import { HelperService } from './helper.service';

@Module({
  controllers: [],
  providers: [HelperService],
})
export class HelperModule {}
