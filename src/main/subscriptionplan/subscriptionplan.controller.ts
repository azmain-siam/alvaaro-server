import { Controller, Get, Post, Body, Param } from '@nestjs/common';
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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subscriptionplanService.findOne(+id);
  }
}
