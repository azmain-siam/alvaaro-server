import { Injectable } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { PrismaService } from 'src/prisma-service/prisma-service.service';
import { CategoryType } from '@prisma/client';
import { ApiResponse } from 'src/utils/common/apiresponse/apiresponse';

@Injectable()
export class CarService {
  constructor(private prisma: PrismaService) {}
  async create(createCarDto: CreateCarDto, images: string[]) {
    try {
      const result = await this.prisma.$transaction(async (tx) => {
        const product = await tx.product.create({
          data: {
            sellerId: '88b6b5fe-6d9a-45f0-a03b-c5bcb2e6cce3',
            name: createCarDto.name,
            description: createCarDto.description,
            price: createCarDto.price,
            images,
            category: createCarDto.category as CategoryType,
          },
        });

        const car = await tx.car.create({
          data: {
            condition: createCarDto.condition,
            manufacture: createCarDto.manufacture,
            year: createCarDto.year,
            model: createCarDto.model,
            carBodyStyle: createCarDto.carBodyStyle,
            transmission: createCarDto.transmission,
            mileage: createCarDto.mileage,
            cylinders: createCarDto.cylinders,
            tractionType: createCarDto.tractionType,
            fuelType: createCarDto.fuelType,
            productId: product.id,
          },
        });

        return { ...product, ...car };
      });

      return ApiResponse.success(result, 'Car created successfully.');
    } catch (error) {
      console.error('Transaction Error:', error);
      return ApiResponse.error('Failed to create car with transaction.', error);
    }
  }

  async findAll() {
    try {
      const cars = await this.prisma.car.findMany({});
      const productIds = cars.map((car) => car.productId);

      const products = await this.prisma.product.findMany({
        where: { id: { in: productIds } },
        orderBy: { trending: 'desc' },
      });
      const carsWithProducts = cars.map((car) => {
        const product = products.find((p) => p.id === car.productId);
        return { ...product, ...car };
      });

      return ApiResponse.success(
        carsWithProducts,
        'Cars with product info retrieved successfully.',
      );
    } catch (error) {
      console.error('Error retrieving cars:', error);
      return ApiResponse.error('Failed to retrieve cars.', error);
    }
  }
  async findOne(id: string) {
    try {
      const carDetails = await this.prisma.car.findUniqueOrThrow({
        where: { id },
        include: {
          product: true,
        },
      });

      return ApiResponse.success(
        carDetails,
        'Car details retrieved successfully.',
      );
    } catch (error) {
      console.error('Error finding car:', error);
      return ApiResponse.error('Failed to find car.', error);
    }
  }

  async remove(id: string) {
    try {
      const carDetails = await this.prisma.car.findUnique({ where: { id } });
      const productId = carDetails?.productId;
      await this.prisma.car.delete({ where: { id } });
      if (productId) {
        const deleteProduct = await this.prisma.product.delete({
          where: { id: productId },
        });
        return ApiResponse.success(deleteProduct, 'Car  deleted successfully.');
      }
    } catch (error) {
      console.error('Error deleting car:', error);
      return ApiResponse.error('Failed to delete car.', error);
    }
  }
}
