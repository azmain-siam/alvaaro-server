import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateSubscriptionPlanDto } from './dto/create-subscriptionplan.dto';
import { PrismaService } from 'src/prisma-service/prisma-service.service';

@Injectable()
export class SubscriptionplanService {
  constructor(private prisma: PrismaService) {}
  async create(createSubscriptionplanDto: CreateSubscriptionPlanDto) {
    try {
      const result = await this.prisma.subscriptionPlan.upsert({
        where: { type: createSubscriptionplanDto.type },
        update: {},
        create: {
          ...createSubscriptionplanDto,
        },
      });

      return result;
    } catch (error) {
      console.error('Error creating/upserting SubscriptionPlan:', error);
      throw new InternalServerErrorException(
        'Failed to create or update subscription plan.',
      );
    }
  }

  findAll() {
    return this.prisma.subscriptionPlan.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} subscriptionplan`;
  }
}
