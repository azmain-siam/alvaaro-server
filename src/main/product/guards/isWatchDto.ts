import { CreateProductDto } from '../dto/create-product.dto';
import { CreateWatchDto } from 'src/main/watch/dto/create-watch.dto';

export function isWatchDto(dto: CreateProductDto): dto is CreateWatchDto {
  return dto?.category === 'WATCH';
}
