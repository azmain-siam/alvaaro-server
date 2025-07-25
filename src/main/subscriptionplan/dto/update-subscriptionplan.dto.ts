import { ApiProperty } from '@nestjs/swagger';
import { SubscriptionPlanType } from '@prisma/client';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateSubscriptionplanDto {
  // @ApiProperty({ example: '4b28bdea-....' })
  // userId: string
  @ApiProperty({
    enum: SubscriptionPlanType,
    example: SubscriptionPlanType.BASIC,
  })
  @IsEnum(SubscriptionPlanType)
  @IsOptional()
  type: SubscriptionPlanType;

  @ApiProperty({ example: '30 days' })
  @IsString()
  @IsOptional()
  length: string;

  @ApiProperty({ example: '19.99' })
  @IsString()
  @IsOptional()
  price: string;

  @ApiProperty({ example: ["Feature 1", "Feature 2", "Feature 3"] })
  @IsString()
  @IsOptional()
  features: string[];
}
