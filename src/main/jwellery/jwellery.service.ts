import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma-service/prisma-service.service';
import { ApiResponse } from 'src/utils/common/apiresponse/apiresponse';

@Injectable()
export class JewelleryService {
  constructor(private readonly prisma: PrismaService) {}

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
