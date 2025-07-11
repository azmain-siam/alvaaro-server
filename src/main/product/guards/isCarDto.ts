import { CreateProductDto } from '../dto/create-product.dto';
import { CreateCarDto } from 'src/main/car/dto/create-car.dto';

export function isCarDto(dto: CreateProductDto): dto is CreateCarDto {
  return dto?.category === 'CAR';
}
