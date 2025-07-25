import { features } from 'process';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { SubscriptionPlanType } from '@prisma/client';

export class CreateSubscriptionPlanDto {


  @ApiProperty({
    enum: SubscriptionPlanType,
    example: SubscriptionPlanType.BASIC,
  })
  @IsEnum(SubscriptionPlanType)
  type: SubscriptionPlanType;

  @ApiProperty({ example: '30 days' })
  @IsString()
  @IsNotEmpty()
  length: string;

  @ApiProperty({ example: '19.99' })
  @IsString()
  @IsNotEmpty()
  price: string;

  @ApiProperty({ example: ["Feature 1", "Feature 2", "Feature 3"] })
  @IsString()
  features: string[];
}
