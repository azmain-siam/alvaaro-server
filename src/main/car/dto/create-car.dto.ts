// dto/create-car.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, IsNotEmpty } from 'class-validator';
import { CreateProductDto } from 'src/main/product/dto/create-product.dto';

export class CreateCarDto extends CreateProductDto {
  @ApiProperty()
  @IsUUID()
  productId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  condition: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  manufacture: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  year: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  model: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  carBodyStyle: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  transmission: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  mileage: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  cylinders: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  tractionType: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  fuelType: string;
}
