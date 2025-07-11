import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsBoolean,
  IsOptional,
  IsPhoneNumber,
} from 'class-validator';

export class CreateSellerDto {
  @ApiProperty({ example: 'Alvaaro Technologies' })
  @IsString()
  companyName: string;

  @ApiProperty({ example: 'https://alvaaro.com' })
  @IsString()
  companyWebsite: string;

  @ApiProperty({ example: '01837588068' })
  @IsPhoneNumber('BD')
  phone: string;

  @ApiProperty({ example: 'House 42, Road 7, Block C' })
  @IsString()
  address: string;

  @ApiProperty({ example: 'Dhaka' })
  @IsString()
  state: string;

  @ApiProperty({ example: 'Dhaka' })
  @IsString()
  city: string;

  @ApiProperty({ example: '1212' })
  @IsString()
  zip: string;

  @ApiProperty({ example: false, required: false })
  @IsOptional()
  @IsBoolean()
  subscriptionStatus?: boolean;

  @ApiProperty({ example: '4b28bdea-cd53-4dae-aacb-2545a039012d' })
  @IsString()
  subscriptionPlan: string;
}
