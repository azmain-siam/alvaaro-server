/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { PrismaService } from 'src/prisma-service/prisma-service.service';
import { CategoryType } from '@prisma/client';
import { ApiResponse } from 'src/utils/common/apiresponse/apiresponse';

@Injectable()
export class CarService {
  constructor(private prisma: PrismaService) {}
  async create(createCarDto: CreateCarDto, images: string[]) {
    try {
      const { name, description, price, category, ...carData } = createCarDto;

      const product = await this.prisma.product.create({
        data: {
          sellerId: 'be5b661c-22dc-4fcd-b737-db40b7ffc56d' as string,
          name,
          description,
          price,
          images,
          category: category as CategoryType,
        },
      });
      if (product) {
        const car = await this.prisma.car.create({
          data: {
            ...carData,
            productId: product.id,
          },
        });
        return ApiResponse.success(
          car,
          'Car created successfully with product.',
        );
      }
    } catch (error) {
      console.error('Error creating car with product:', error);
      return ApiResponse.error('Failed to create car with product.', error);
    }
  }

  async findAll() {
    try {
      const cars = await this.prisma.car.findMany({});
      const productIds = cars.map((car) => car.productId);

      const products = await this.prisma.product.findMany({
        where: { id: { in: productIds } },
      });

      const merged = cars.map((car) => {
        const product = products.find((p) => p.id === car.productId);
        return {
          ...product,
          ...car,
        };
      });

      return ApiResponse.success(
        merged,
        'Cars with product info retrieved successfully.',
      );
    } catch (error) {
      console.error('Error retrieving cars:', error);
      return ApiResponse.error('Failed to retrieve cars.', error);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} car`;
  }

  update(id: number, updateCarDto: UpdateCarDto) {
    console.log('Updating car with ID:', updateCarDto);
    return `This action updates a #${id} car`;
  }

  remove(id: number) {
    return `This action removes a #${id} car`;
  }
}
