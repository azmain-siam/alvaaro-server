
import { Controller, Get, Post, Body, Put, Req, Patch, Param } from '@nestjs/common';
import { CreateSubscriptionPlanDto } from './dto/create-subscriptionplan.dto';
import { SubscriptionplanService } from './subscriptionplan.service';
import { UpdateSubscriptionplanDto } from './dto/update-subscriptionplan.dto';
import { Request } from 'express';

@Controller('subscriptionplan')
export class SubscriptionplanController {
  constructor(
    private readonly subscriptionplanService: SubscriptionplanService,
  ) {}


  
  @Post("create-plan")
  async create(@Body() dto: CreateSubscriptionPlanDto) {
    return await this.subscriptionplanService.createSubscription(dto);
  }

  @Get("all-plan")
  async findAll() {
    const result = await this.subscriptionplanService.findAll();
    return result 
  }

  @Patch("update-plan/:id")
  async updatePlanById(@Param("id") id:string, @Body() dto: UpdateSubscriptionplanDto) {
    
    const result = await this.subscriptionplanService.updatePlanByAdmin(id, dto );
    return result ;
  }
}
