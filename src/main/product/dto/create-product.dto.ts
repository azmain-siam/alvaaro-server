import { ApiProperty } from '@nestjs/swagger';
import { CategoryType } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateRealEstateDto } from 'src/main/real-estate/dto/create-real-estate.dto';

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
    type: 'array',
    items: {
      type: 'file',
      format: 'binary',
    },
  })
  images?: Express.Multer.File[];

  @ApiProperty({ enum: CategoryType })
  @IsEnum(CategoryType)
  category: CategoryType;

  @ApiProperty({ required: false })
  @IsOptional()
  realEstateDetails?: CreateRealEstateDto;
}
