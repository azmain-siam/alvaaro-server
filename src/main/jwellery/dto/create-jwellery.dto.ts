import { ApiProperty } from '@nestjs/swagger';
import { CategoryType } from '@prisma/client';
import { IsArray, IsString } from 'class-validator';

export class CreateJewelleryDto {
  @ApiProperty({ example: 'Elegant Gold Necklace' })
  name: string;

  @ApiProperty({ example: '24K handcrafted gold necklace' })
  description: string;

  @ApiProperty({ example: '5000' })
  price: string;

  @ApiProperty({
    description: 'Photo showing the problem (required)',
    type: 'array',
    items: { type: 'file', format: 'binary' },
    required: true,
  })
  images?: Express.Multer.File[];

  @ApiProperty({ enum: CategoryType, example: CategoryType.JEWELLERY })
  category: CategoryType;

  @ApiProperty({ example: 'New' })
  condition: string;
  @ApiProperty({ example: 'Chowdhury Jewellers' })
  manufacture: string;

  @ApiProperty({ example: '1 Year Warranty' })
  warranty: string;

  @ApiProperty({ example: 'Necklace-2024' })
  model: string;

  @ApiProperty({ example: 'Yes' })
  waterResistance: string;

  @ApiProperty({ example: 'Analog' })
  displayType: string;

  @ApiProperty({ example: 'Gold Chain' })
  strapMaterial: string;

  @ApiProperty({ example: 'Quartz' })
  movement: string;

  @ApiProperty({ example: 'Medium' })
  size: string;

  @ApiProperty({ example: 'None' })
  tractionType: string;

  @ApiProperty({
    example: ['24K', 'Handmade', 'Limited Edition'],
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  features: string;
}
