import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SubscriptionplanService } from './subscriptionplan.service';
import { CreateSubscriptionplanDto } from './dto/create-subscriptionplan.dto';
import { UpdateSubscriptionplanDto } from './dto/update-subscriptionplan.dto';

@Controller('subscriptionplan')
export class SubscriptionplanController {
  constructor(private readonly subscriptionplanService: SubscriptionplanService) {}

  @Post()
  create(@Body() createSubscriptionplanDto: CreateSubscriptionplanDto) {
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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubscriptionplanDto: UpdateSubscriptionplanDto) {
    return this.subscriptionplanService.update(+id, updateSubscriptionplanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subscriptionplanService.remove(+id);
  }
}
