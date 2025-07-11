import { CreateRealEstateDto } from 'src/main/real-estate/dto/create-real-estate.dto';
import { CreateProductDto } from '../dto/create-product.dto';

export function isRealEstateDto(
  dto: CreateProductDto,
): dto is CreateRealEstateDto {
  return dto?.category === 'REAL_ESTATE' && 'beds' in dto && 'washroom' in dto;
}
