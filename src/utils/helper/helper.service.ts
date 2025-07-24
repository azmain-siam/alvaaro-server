import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma-service/prisma-service.service';

@Injectable()
export class HelperService {
  constructor(private readonly prismaService: PrismaService) {}

  async userExists(userId: string): Promise<boolean> {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
    });
    return !!user;
  }

  async sellerExists(userId: string) {
    const seller = await this.prismaService.seller.findUnique({
      where: { userId },
      select: { id: true },
    });
    console.log('sellerExists', seller);
    if (!seller) {
      throw new Error('Seller does not exist');
    }
    return seller.id;
  }
}
