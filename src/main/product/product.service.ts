import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma-service/prisma-service.service';
import { CreateRealEstateDto } from '../real-estate/dto/create-real-estate.dto';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async createRealEstateProduct(
    dto: CreateRealEstateDto,
    imageUrls: string[],
    sellerId: string,
  ) {
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

    await this.prisma.realEstate.create({
      data: {
        productId: product.id,
        beds: dto.beds,
        address: dto.address,
        city: dto.city,
        state: dto.state,
        zip: dto.zip,
        size: dto.size,
        washroom: dto.washroom,
        text: Array.isArray(dto.text) ? dto.text : [dto.text],
        feature: Array.isArray(dto.feature) ? dto.feature : [dto.feature],
      },
    });

    return product;
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
