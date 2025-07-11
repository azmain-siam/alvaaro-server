import { CreateProductDto } from '../dto/create-product.dto';
import { CreateJewelleryDto } from 'src/main/jwellery/dto/create-jwellery.dto';

export function isJewelleryDto(
  dto: CreateProductDto,
): dto is CreateJewelleryDto {
  return dto?.category === 'JEWELLERY';
}
