import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateSellerDto } from './dto/create-seller.dto';
import { UpdateSellerDto } from './dto/update-seller.dto';
import { PrismaService } from 'src/prisma-service/prisma-service.service';

@Injectable()
export class SellerService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createSellerDto: CreateSellerDto, userId: string) {
    try {
      const result = await this.prisma.seller.upsert({
        where: { userId },
        update: {},
        create: {
          ...createSellerDto,
          userId,
        },
      });

      return result;
    } catch (error) {
      Logger.error('Upsert Seller Error:', error);
      throw new InternalServerErrorException('Failed to create seller.');
    }
  }

  findAll() {
    return this.prisma.seller.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} seller`;
  }

  update(id: number, updateSellerDto: UpdateSellerDto) {
    return `This action updates a #${id} seller`;
  }

  remove(id: number) {
    return `This action removes a #${id} seller`;
  }
}
