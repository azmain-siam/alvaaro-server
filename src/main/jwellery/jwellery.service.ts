import { Injectable } from '@nestjs/common';
import { CreateJewelleryDto } from './dto/create-jwellery.dto';
import { PrismaService } from 'src/prisma-service/prisma-service.service';
import { ApiResponse } from 'src/utils/common/apiResponse/apiResponse';

@Injectable()
export class JewelleryService {
  constructor(private readonly prisma: PrismaService) {}
  async create(
    createJewelleryDto: CreateJewelleryDto,
    images: string[],
    sellerId: string,
  ) {
    try {
      const featuresString = createJewelleryDto.features;
      const featuresArray: string[] = featuresString
        .split(',')
        .map((item) => item.trim());

      const result = await this.prisma.jewellery.create({
        data: {
          ...createJewelleryDto,
          features: featuresArray,
          sellerId,
          images,
        },
      });

      return ApiResponse.success(result, 'Jewellery Created Successfully');
    } catch (error) {
      return ApiResponse.error('Jewellery Created failed', error);
    }
  }

  async findAll() {
    try {
      const allJewelries = await this.prisma.jewellery.findMany();
      return ApiResponse.success(allJewelries, 'All Jewelries Retrieved');
    } catch (error) {
      return ApiResponse.error('Jewellery retrieved Unsuccessful', error);
    }
  }

  async findOne(id: string) {
    try {
      const jewellery = await this.prisma.jewellery.findUnique({
        where: { id },
      });

      return ApiResponse.success(jewellery, 'Jewellery Found Here');
    } catch (error) {
      return ApiResponse.error('Jewellery retrieved failure', error);
    }
  }

  async remove(id: string) {
    try {
      const jewellery = await this.prisma.jewellery.delete({
        where: { id },
      });
      return ApiResponse.success(jewellery, 'Jewellery deleted successfully');
    } catch (error) {
      return ApiResponse.error('Jewellery deleted failed', error);
    }
  }
}
