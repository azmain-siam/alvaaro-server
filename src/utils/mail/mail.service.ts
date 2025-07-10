// src/email/email.service.ts
import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;
  private readonly logger = new Logger(MailService.name);

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.APP_PASS,
      },
    });
  }

  async sendMail(to: string, text: string) {
    try {
      const info = await this.transporter.sendMail({
        from: this.configService.get('EMAIL_FROM'),
        to,
        text: `Hi there,
Thank you for subscribing to Alvaaro's newsletter! 
Best regards,  
The Alvaaro Team`,
      });
      this.logger.log(`Email sent: ${info.messageId}`);
    } catch (error) {
      this.logger.error('Failed to send email', error.stack);
      throw error;
    }
  }
}
