import { Injectable } from '@nestjs/common';
import { CreateSubscriptionplanDto } from './dto/create-subscriptionplan.dto';
import { UpdateSubscriptionplanDto } from './dto/update-subscriptionplan.dto';

@Injectable()
export class SubscriptionplanService {
  create(createSubscriptionplanDto: CreateSubscriptionplanDto) {
    return 'This action adds a new subscriptionplan';
  }

  findAll() {
    return `This action returns all subscriptionplan`;
  }

  findOne(id: number) {
    return `This action returns a #${id} subscriptionplan`;
  }

  update(id: number, updateSubscriptionplanDto: UpdateSubscriptionplanDto) {
    return `This action updates a #${id} subscriptionplan`;
  }

  remove(id: number) {
    return `This action removes a #${id} subscriptionplan`;
  }
}
