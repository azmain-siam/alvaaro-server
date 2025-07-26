import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSubscriptionPlanDto } from './dto/create-subscriptionplan.dto';
import { PrismaService } from 'src/prisma-service/prisma-service.service';
import { ApiResponse } from 'src/utils/common/apiresponse/apiresponse';
import { UpdateSubscriptionplanDto } from './dto/update-subscriptionplan.dto';

@Injectable()
export class SubscriptionplanService {
  constructor(private prisma: PrismaService) {}

  async createSubscription(dto: CreateSubscriptionPlanDto) {
    try {
      const data = {
        type: dto.type,
        price: dto.price,
        length: dto.length,
        features: dto.features,
      };

      const result = await this.prisma.subscriptionPlan.upsert({
        where: { type: dto.type },
        update: data,
        // status er beparta bjte pari nai
        create: { ...dto },
      });

      return ApiResponse.success(
        result,
        'Subscription plan created successfully',
      );
    } catch (err) {
      // aikhane vol process error handle kora hoyeche
      return ApiResponse.error(err, 'Subscription faild');
    }
  }

  async findAll() {
    try {
      const result = await this.prisma.subscriptionPlan.findMany();
      return result;
    } catch (err) {
      // aikhane vol process error handle kora hoyeche
      return ApiResponse.error(err, 'Subscription does not fetches');
    }
  }

  async updatePlanByAdmin(planId: string, dto: UpdateSubscriptionplanDto) {
    try {
      const { length, price, type } = dto;

      const isPlanExists = await this.prisma.subscriptionPlan.findUnique({
        where: {
          id: planId,
        },
      });

      if (!isPlanExists) {
        // amader to response banano hoise, oita use korei error throw kora hobe
        throw new BadRequestException('Plan can not found');
      }

      const result = await this.prisma.subscriptionPlan.update({
        where: {
          type,
        },
        data: {
          length,
          price,
          type,
        },
      });
      console.log(result, 'res');
      return ApiResponse.success(result, 'Plan Update successfully');
    } catch (err) {
      // aikhane vol process error handle kora hoyeche
      return ApiResponse.error(err, 'Plan Update failed');
    }
  }
}
