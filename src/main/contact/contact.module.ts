
import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { PrismaService } from 'src/prisma-service/prisma-service.service';


@Module({
  imports: [PrismaService],
  controllers: [ContactController],
  providers: [ContactService],
})
export class ContactModule {}
