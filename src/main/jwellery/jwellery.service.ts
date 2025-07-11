import { Injectable } from '@nestjs/common';
import { CreateJewelleryDto } from './dto/create-jwellery.dto';
import { PrismaService } from 'src/prisma-service/prisma-service.service';
import { ApiResponse } from 'src/utils/common/apiresponse/apiresponse';

@Injectable()
export class JwelleryService {
  constructor(private readonly prisma: PrismaService) {}
  async create(
    createJwelleryDto: CreateJewelleryDto,
    images: string[],
    sellerId: string,
  ) {
    try {
      const featuresString = createJwelleryDto.features;
      const featuresArray: string[] = featuresString
        .split(',')
        .map((item) => item.trim());

      const result = await this.prisma.jewellery.create({
        data: {
          ...createJwelleryDto,
          features: featuresArray,
          sellerId,
          images,
        },
      });

      return ApiResponse.success(result, 'Jwellery Created Successfully');
    } catch (error) {
      return ApiResponse.error(error, 'Jwellery Created failed');
    }
  }

  async findAll() {
    try {
      const allJewelleries = await this.prisma.jewellery.findMany();
      return ApiResponse.success(allJewelleries, 'All Jewelleries Retrieved');
    } catch (error) {
      return ApiResponse.error(error, 'Jwellery retrived Unsuccessfull');
    }
  }

  async findOne(id: string) {
    try {
      const jewellery = await this.prisma.jewellery.findUnique({
        where: { id },
      });

      return ApiResponse.success(jewellery, 'Jewellery Found Here');
    } catch (error) {
      return ApiResponse.error(error, 'Jwellery retrived failder');
    }
  }

  async remove(id: string) {
    try {
      const jewellery = await this.prisma.jewellery.delete({
        where: { id },
      });
      return ApiResponse.success(jewellery, 'Jwelery deleted successfully');
    } catch (error) {
      return ApiResponse.error(error, 'Jwelery deleted failed');
    }
  }
}
