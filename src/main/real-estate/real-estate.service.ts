import { Injectable } from '@nestjs/common';
import { CreateRealEstateDto } from './dto/create-real-estate.dto';
import { UpdateRealEstateDto } from './dto/update-real-estate.dto';

@Injectable()
export class RealEstateService {
  create(createRealEstateDto: CreateRealEstateDto) {
    return 'This action adds a new realEstate';
  }

  findAll() {
    return `This action returns all realEstate`;
  }

  findOne(id: number) {
    return `This action returns a #${id} realEstate`;
  }

  update(id: number, updateRealEstateDto: UpdateRealEstateDto) {
    return `This action updates a #${id} realEstate`;
  }

  remove(id: number) {
    return `This action removes a #${id} realEstate`;
  }
}
