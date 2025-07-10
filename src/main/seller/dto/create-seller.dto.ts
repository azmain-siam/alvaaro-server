import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsBoolean,
  // IsUUID,
  IsOptional,
  IsPhoneNumber,
} from 'class-validator';

export class CreateSellerDto {
  // @ApiProperty({
  //   description: 'ID of the user upgrading to seller',
  //   example: 'a4d89c4e-d923-4fc3-9274-8b7485f861a5',
  // })
  // @IsUUID()
  // userId: string;

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
  isVerified?: boolean;

  @ApiProperty({ example: false, required: false })
  @IsOptional()
  @IsBoolean()
  subscriptionStatus?: boolean;
}
