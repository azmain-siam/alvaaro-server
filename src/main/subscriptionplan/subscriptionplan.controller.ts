import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateSubscriptionPlanDto } from './dto/create-subscriptionplan.dto';
import { SubscriptionplanService } from './subscriptionplan.service';

@Controller('subscriptionplan')
export class SubscriptionplanController {
  constructor(
    private readonly subscriptionplanService: SubscriptionplanService,
  ) {}
  @Post()
  create(@Body() createSubscriptionplanDto: CreateSubscriptionPlanDto) {
    return this.subscriptionplanService.create(createSubscriptionplanDto);
  }

  @Get()
  findAll() {
    return this.subscriptionplanService.findAll();
  }
}
