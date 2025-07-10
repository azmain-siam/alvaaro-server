import { Module } from '@nestjs/common';
import { NewsletterService } from './newsletter.service';
import { NewsletterController } from './newsletter.controller';
import { PrismaModule } from 'src/prisma-service/prisma-service.module';
import { MailModule } from 'src/utils/mail/mail.module';

@Module({
  imports: [PrismaModule, MailModule],
  controllers: [NewsletterController],
  providers: [NewsletterService],
})
export class NewsletterModule {}
