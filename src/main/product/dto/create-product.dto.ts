// dto/create-product.dto.ts
import { ApiProperty } from '@nestjs/swagger';

import { IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export enum CategoryType {
  CAR = 'CAR',
  WATCH = 'WATCH',
  JEWELLERY = 'JEWELLERY',
  REALESTATE = 'REALESTATE',
  YACHT = 'YACHT',
}

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsString()
  price: string;

  @ApiProperty({
    description: 'Photo showing the problem (required)',
    type: 'array',
    items: { type: 'file', format: 'binary' },
    required: true,
  })
  images?: Express.Multer.File[];

  @ApiProperty({ enum: CategoryType })
  @IsEnum(CategoryType)
  category: CategoryType;
}
