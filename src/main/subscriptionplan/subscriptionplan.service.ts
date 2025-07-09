import { Injectable } from '@nestjs/common';
import { CreateSubscriptionPlanDto } from './dto/create-subscriptionplan.dto';
import { PrismaService } from '../prisma-service/prisma-service.service';

@Injectable()
export class SubscriptionplanService {
  constructor(private prisma: PrismaService) {}
  async create(createSubscriptionplanDto: CreateSubscriptionPlanDto) {
    const result = await this.prisma.subscriptionPlan.create({
      data: createSubscriptionplanDto,
    });
    return result;
  }

  findAll() {
    return this.prisma.subscriptionPlan.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} subscriptionplan`;
  }
}
