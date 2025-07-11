import { PartialType } from '@nestjs/swagger';
import { CreateRealEstateDto } from './create-real-estate.dto';

export class UpdateRealEstateDto extends PartialType(CreateRealEstateDto) {}
