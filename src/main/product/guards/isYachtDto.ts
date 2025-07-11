import { CreateYachtDto } from 'src/main/yacht/dto/create-yacht.dto';
import { CreateProductDto } from '../dto/create-product.dto';

export function isYachtDto(dto: CreateProductDto): dto is CreateYachtDto {
  return dto?.category === 'YACHT';
}
