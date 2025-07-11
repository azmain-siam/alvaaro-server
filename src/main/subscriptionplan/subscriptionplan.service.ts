import { Injectable } from '@nestjs/common';
import { CreateSubscriptionPlanDto } from './dto/create-subscriptionplan.dto';
import { PrismaService } from 'src/prisma-service/prisma-service.service';
import { ApiResponse } from 'src/utils/common/apiResponse/apiResponse';

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

      return ApiResponse.success(
        result,
        'Subscription plan created successfully.',
      );
    } catch (error) {
      return ApiResponse.error('Failed to create subscription plan.', error);
    }
  }

  findAll() {
    return this.prisma.subscriptionPlan.findMany();
  }
}
