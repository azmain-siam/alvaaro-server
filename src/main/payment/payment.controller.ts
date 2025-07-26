// src/stripe/stripe.controller.ts
import { Controller, Get, Headers, Post, Req, Res } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { Request, Response } from 'express';

@Controller('stripe')
export class PaymentController {
  constructor(private readonly stripeService: PaymentService) {}

  @Get('checkout')
  async checkout() {
    return this.stripeService.createCheckoutSession();
  }

  @Get('payment-success')
  paymentSuccess(@Res() res: Response) {
    return res.send(
      '<h1>Payment Successful!</h1><p>Thank you for your purchase.</p>',
    );
  }

  @Get('payment-cancel')
  paymentCancel(@Res() res: Response) {
    return res.send(
      '<h1>Payment Cancelled</h1><p>Your payment was cancelled.</p>',
    );
  }

  // * Webhook
  @Post('webhook')
  async handleWebhook(
    @Req() req: Request,
    @Res() res: Response,
    @Headers('stripe-signature') sig: string,
  ) {
    try {
      await this.stripeService.handleWebhook(req.body, sig);
    } catch (err) {
      console.error('Webhook error:', err);
      res.status(400).send(`Webhook Error: ${err.message}`);
    }
  }
}
