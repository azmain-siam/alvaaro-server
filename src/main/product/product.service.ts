import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma-service/prisma-service.service';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

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
