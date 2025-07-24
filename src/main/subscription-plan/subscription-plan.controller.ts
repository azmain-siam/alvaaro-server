import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SubscriptionPlanService } from './subscription-plan.service';
import { CreateSubscriptionPlanDto } from './dto/create-subscription-plan.dto';
import { UpdateSubscriptionPlanDto } from './dto/update-subscription-plan.dto';

@Controller('subscription-plan')
export class SubscriptionPlanController {
  constructor(private readonly subscriptionPlanService: SubscriptionPlanService) {}

  @Post("create-plan")
  create(@Body() dto: CreateSubscriptionPlanDto) {
    return this.subscriptionPlanService.createSubscriptionPlan(dto);
  }

  // @Get()
  // findAll() {
  //   return this.subscriptionPlanService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.subscriptionPlanService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateSubscriptionPlanDto: UpdateSubscriptionPlanDto) {
  //   return this.subscriptionPlanService.update(+id, updateSubscriptionPlanDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.subscriptionPlanService.remove(+id);
  // }
}
