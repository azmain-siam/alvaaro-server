import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma-service/prisma-service.service';
import { CreateWatchDto } from './dto/create-watch.dto';
import { UpdateWatchDto } from './dto/update-watch.dto';
import { CategoryType } from '@prisma/client';
import { ApiResponse } from 'src/utils/common/apiresponse/apiresponse';

@Injectable()
export class WatchService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createWatchDto: CreateWatchDto, images: string[]) {
    try {
      const productData = {
        sellerId: '88b6b5fe-6d9a-45f0-a03b-c5bcb2e6cce3',
        name: createWatchDto.name,
        description: createWatchDto.description,
        price: String(createWatchDto.price ?? ''),
        images,
        category: createWatchDto.category as CategoryType,
      };

      const createdProduct = await this.prisma.product.create({
        data: productData,
      });

      const watchData = {
        productId: createdProduct.id,
        condition: createWatchDto.condition,
        manufacture: createWatchDto.manufacture,
        warranty: createWatchDto.warranty,
        model: createWatchDto.model,
        waterResistance: createWatchDto.waterResistance,
        displayType: createWatchDto.displayType,
        strapMaterial: createWatchDto.strapMaterial,
        movement: createWatchDto.movement,
        size: createWatchDto.size,
        tractionType: createWatchDto.tractionType,
        features: Array.isArray(createWatchDto.features)
          ? createWatchDto.features
          : typeof createWatchDto.features === 'string'
            ? (createWatchDto.features as string)
                .split(',')
                .map((f) => f.trim())
            : [],
      };

      const createdWatch = await this.prisma.watch.create({
        data: watchData,
        include: { product: true },
      });

      return createdWatch;
    } catch (error) {
      console.error('Create Watch Error:', error);
      throw new InternalServerErrorException('Failed to create watch.');
    }
  }

  async findAll() {
    try {
      const allWatch=  await this.prisma.watch.findMany({
        include: { product: true },
      });
      return ApiResponse.success(allWatch, 'Watches fetched successfully');
    } catch (error) {
      console.error('Find All Watches Error:', error);
      throw new InternalServerErrorException('Failed to fetch watches.');
    }
  }

  async findOne(id: string) {
    try {
      const watch = await this.prisma.watch.findUnique({
        where: { id },
        include: { product: true },
      });

      if (!watch) {
        throw new NotFoundException(`Watch with ID ${id} not found`);
      }

      return ApiResponse.success(watch, 'Watch fetched successfully');
    } catch (error) {
      console.error(`Find Watch Error for ID ${id}:`, error);
      throw new InternalServerErrorException('Failed to fetch watch.');
    }
  }

  async update(id: string, updateWatchDto: UpdateWatchDto) {
    try {
      const updatedWatch = await this.prisma.watch.update({
        where: { id },
        data: {
          condition: updateWatchDto.condition,
          manufacture: updateWatchDto.manufacture,
          warranty: updateWatchDto.warranty,
          model: updateWatchDto.model,
          waterResistance: updateWatchDto.waterResistance,
          displayType: updateWatchDto.displayType,
          strapMaterial: updateWatchDto.strapMaterial,
          movement: updateWatchDto.movement,
          size: updateWatchDto.size,
          tractionType: updateWatchDto.tractionType,
          features: Array.isArray(updateWatchDto.features)
            ? updateWatchDto.features
            : typeof updateWatchDto.features === 'string'
              ? updateWatchDto.features.split(',').map((f) => f.trim())
              : [],
          product: {
            update: {
              name: updateWatchDto.name,
              description: updateWatchDto.description,
              price:
                updateWatchDto.price !== undefined
                  ? String(updateWatchDto.price)
                  : undefined,
              images: updateWatchDto.images,
              category: updateWatchDto.category,
              sellerId: updateWatchDto.sellerId,
            },
          },
        },
        include: { product: true },
      });

      return ApiResponse.success(updatedWatch, 'Watch updated successfully');
    } catch (error) {
      console.error(`Update Watch Error for ID ${id}:`, error);
      throw new InternalServerErrorException('Failed to update watch.');
    }
  }

  async remove(id: string) {
    try {
      const existingWatch = await this.prisma.watch.findUnique({
        where: { id },
      });

      if (!existingWatch) {
        throw new NotFoundException(`Watch with ID ${id} not found`);
      }

      await this.prisma.watch.delete({ where: { id } });
      await this.prisma.product.delete({
        where: { id: existingWatch.productId },
      });

      return { message: 'Watch and associated product deleted successfully' };
    } catch (error) {
      console.error(`Delete Watch Error for ID ${id}:`, error);
      throw new InternalServerErrorException('Failed to delete watch.');
    }
  }
}
