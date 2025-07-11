import { Module } from '@nestjs/common';
import { SellerService } from './seller.service';
import { SellerController } from './seller.controller';
import { AuthModule } from '../auth/auth.module';
import { MailModule } from 'src/utils/mail/mail.module';

@Module({
  imports: [AuthModule, MailModule],
  controllers: [SellerController],
  providers: [SellerService],
})
export class SellerModule {}
