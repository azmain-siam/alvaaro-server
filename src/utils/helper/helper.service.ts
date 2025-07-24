import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma-service/prisma-service.service';

@Injectable()
export class HelperService {
  constructor(
    private readonly prismaService: PrismaService, // Assuming you have a PrismaService to interact with your database
  ) {}

  async userExists(userId: string): Promise<boolean> {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
    });
    return !!user;
  }
  async sellerExists(sellerId: string): Promise<boolean> {
    const seller = await this.prismaService.seller.findUnique({
      where: { id: sellerId },
    });
    return !!seller;
  }
}
