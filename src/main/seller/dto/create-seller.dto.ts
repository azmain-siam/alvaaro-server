import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsBoolean,
  // IsUUID,
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
  @IsPhoneNumber('BD') // or use IsString() if not validating country code
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
}
