import { Injectable } from '@nestjs/common';
import { CreateYachtDto } from './dto/create-yacht.dto';
import { UpdateYachtDto } from './dto/update-yacht.dto';

@Injectable()
export class YachtService {
  create(createYachtDto: CreateYachtDto) {
    return 'This action adds a new yacht';
  }

  findAll() {
    return `This action returns all yacht`;
  }

  findOne(id: number) {
    return `This action returns a #${id} yacht`;
  }

  update(id: number, updateYachtDto: UpdateYachtDto) {
    return `This action updates a #${id} yacht`;
  }

  remove(id: number) {
    return `This action removes a #${id} yacht`;
  }
}
