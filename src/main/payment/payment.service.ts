import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class PaymentService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {});
  }

  async createCheckoutSession(userId?: string, email?: string) {
    try {
      const customerById =
        await this.stripe.customers.retrieve('cus_SkmMJK7QaFEpnA');

      const session = await this.stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'subscription',
        customer: customerById.id,
        metadata: {
          userId: userId || '12345',
          email: email || 'shanto@example.com',
        },
        subscription_data: {
          metadata: {
            userId: userId || '12345',
            email: email || 'shanto@example.com',
          },
        },
        line_items: [
          {
            price: process.env.STRIPE_PRICE_ID as string,
            quantity: 1,
          },
        ],
        success_url: 'http://localhost:3000/stripe/payment-success',
        cancel_url: 'http://localhost:3000/stripe/payment-cancel',
      });
      console.log('Session created:', session);
      return { url: session.url };
    } catch (error) {
      console.error('Error creating checkout session:', error);
      throw error;
    }
  }
  handleWebhook(payload: Buffer, sig: string) {
    const event = this.stripe.webhooks.constructEvent(
      payload,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET as string,
    );
    console.log('Webhook event received:', event.data.object);
    // switch (event.type) {
    //   case 'customer.subscription.created':
    //   case 'customer.subscription.updated': {
    //     const subscription = event.data.object as Stripe.Subscription;
    //     console.log('Subscription created or updated:', subscription);
    //     break;
    //   }

    //   case 'customer.subscription.deleted': {
    //     break;
    //   }
    // }
  }
}
