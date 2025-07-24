import { CreateCarDto } from './../car/dto/create-car.dto';
import { CreateUserDto } from './../user/dto/create-user.dto';
import { Injectable } from '@nestjs/common';
import { CreateSubscriptionPlanDto } from './dto/create-subscription-plan.dto';
import { UpdateSubscriptionPlanDto } from './dto/update-subscription-plan.dto';

@Injectable()
export class SubscriptionPlanService {
  createSubscriptionPlan(dto: CreateSubscriptionPlanDto) {
    console.log(dto)
    return 'This action adds a new subscriptionPlan';
  }

  findAll() {
    return `This action returns all subscriptionPlan`;
  }

  findOne(id: number) {
    return `This action returns a #${id} subscriptionPlan`;
  }

  update(id: number, updateSubscriptionPlanDto: UpdateSubscriptionPlanDto) {
    return `This action updates a #${id} subscriptionPlan`;
  }

  remove(id: number) {
    return `This action removes a #${id} subscriptionPlan`;
  }
}
