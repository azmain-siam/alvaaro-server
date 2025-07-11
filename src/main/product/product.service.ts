import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma-service/prisma-service.service';
import { CreateProductDto } from './dto/create-product.dto';
// import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateProductDto, imageUrls: string[], sellerId: string) {
    const product = await this.prisma.product.create({
      data: {
        name: dto.name,
        description: dto.description,
        price: dto.price,
        images: imageUrls,
        category: dto.category,
        sellerId,
      },
    });

    console.log(product);
  }

  async update(id: string) {
    return await this.prisma.product.update({
      where: { id },
      data: {
        trending: {
          increment: 1,
        },
      },
    });
  }
}
