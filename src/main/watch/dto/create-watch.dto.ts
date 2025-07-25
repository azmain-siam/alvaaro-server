import { IsString, IsArray, IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateProductDto } from 'src/main/product/dto/create-product.dto';

export class CreateWatchDto extends CreateProductDto {
  @ApiProperty({
    description: 'The UUID of the associated product',
    example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
  })
  @IsUUID()
  @IsNotEmpty()
  productId: string;

  @ApiProperty({
    description: 'The condition of the watch (e.g., new or used)',
    example: 'New',
  })
  @IsString()
  @IsNotEmpty()
  condition: string;

  @ApiProperty({
    description: 'The name of the manufacturer',
    example: 'Rolex',
  })
  @IsString()
  @IsNotEmpty()
  manufacture: string;

  @ApiProperty({
    description: 'Warranty information (e.g., 2 years)',
    example: '2 years',
  })
  @IsString()
  @IsNotEmpty()
  warranty: string;

  @ApiProperty({
    description: 'Model name or number',
    example: 'Oyster Perpetual 41',
  })
  @IsString()
  model: string;

  @ApiProperty({
    description: 'Water resistance level',
    example: '100 meters',
  })
  @IsString()
  waterResistance: string;

  @ApiProperty({
    description: 'Display type of the watch',
    example: 'Analog',
  })
  @IsString()
  displayType: string;

  @ApiProperty({
    description: 'Material used for the strap',
    example: 'Stainless Steel',
  })
  @IsString()
  strapMaterial: string;

  @ApiProperty({
    description: 'Movement type (e.g., automatic, quartz)',
    example: 'Automatic',
  })
  @IsString()
  movement: string;

  @ApiProperty({
    description: 'Size or diameter of the watch case',
    example: '41mm',
  })
  @IsString()
  size: string;

  @ApiProperty({
    description: 'Traction type (e.g., clasp type or drive type)',
    example: 'Deployment Clasp',
  })
  @IsString()
  tractionType: string;

  @ApiProperty({
    description: 'Key features of the watch',
    example: ['Chronograph', 'Sapphire Glass', 'Luminous Hands'],
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  features: string[];
}
