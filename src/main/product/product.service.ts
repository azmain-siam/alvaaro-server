/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma-service/prisma-service.service';
import { uploadMultipleToCloudinary } from 'src/utils/cloudinary/cloudinary';
import { CreateProductDto } from './dto/create-product.dto';
import {
  isCarDto,
  isJewelleryDto,
  isRealEstateDto,
  isWatchDto,
  isYachtDto,
} from './guards';
import { ApiResponse } from 'src/utils/common/apiresponse/apiresponse';
import { CategoryType } from '@prisma/client';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async handleProductCreation(
    dto: CreateProductDto,
    images: Express.Multer.File[],
    sellerId: string,
  ) {
    const imageUrls = images?.length
      ? (await uploadMultipleToCloudinary(images)).map(
          (res: { secure_url: string }) => res.secure_url,
        )
      : [];

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

    if (isRealEstateDto(dto)) {
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
    } else if (isCarDto(dto)) {
      await this.prisma.car.create({
        data: {
          productId: product.id,
          carBodyStyle: dto.carBodyStyle,
          model: dto.model,
          year: dto.year,
          mileage: dto.mileage,
          condition: dto.condition,
          transmission: dto.transmission,
          cylinders: dto.cylinders,
          tractionType: dto.tractionType,
          fuelType: dto.fuelType,
          manufacture: dto.manufacture,
        },
      });
    } else if (isYachtDto(dto)) {
      await this.prisma.yacht.create({
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
    } else if (isWatchDto(dto)) {
      await this.prisma.watch.create({
        data: {
          productId: product.id,
          displayType: dto.displayType,
          waterResistance: dto.waterResistance,
          warranty: dto.warranty,
          manufacture: dto.manufacture,
          condition: dto.condition,
          model: dto.model,
          movement: dto.movement,
          strapMaterial: dto.strapMaterial,
          tractionType: dto.tractionType,
          size: dto.size,
          features: Array.isArray(dto.features) ? dto.features : [dto.features],
        },
      });
    } else if (isJewelleryDto(dto)) {
      await this.prisma.jewellery.create({
        data: {
          productId: product.id,
          condition: dto.condition,
          size: dto.size,
          tractionType: dto.tractionType,
          features: Array.isArray(dto.features) ? dto.features : [dto.features],
          displayType: dto.displayType,
          manufacture: dto.manufacture,
          warranty: dto.warranty,
          model: dto.model,
          waterResistance: dto.waterResistance,
          strapMaterial: dto.strapMaterial,
          movement: dto.movement,
        },
      });
    }
    return ApiResponse.success(product, 'Product created successfully');
  }

  async findAllProducts(category?: CategoryType) {
    const products = await this.prisma.product.findMany({
      where: category ? { category } : {},
      include: {
        seller: {
          select: {
            id: true,
            phone: true,
            address: true,
            companyName: true,
            companyWebsite: true,
          },
        },
        RealEstate: true,
        Car: true,
        Yacht: true,
        Watch: true,
        Jewellery: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return ApiResponse.success(products, 'Products fetched successfully');
  }

  async searchRealEstate(query?: {
    location?: string;
    minPrice?: string;
    maxPrice?: string;
    type?: string;
  }) {
    const { location, minPrice, maxPrice, type } = query ?? {};
    // console.log(type);
    const products = await this.prisma.product.findMany({
      where: {
        category: 'REAL_ESTATE',
        price: {
          gte: minPrice ? minPrice : undefined,
          lte: maxPrice ? maxPrice : undefined,
        },
        AND: [
          location
            ? {
                RealEstate: {
                  is: {
                    OR: [
                      { address: { contains: location, mode: 'insensitive' } },
                      { city: { contains: location, mode: 'insensitive' } },
                      { state: { contains: location, mode: 'insensitive' } },
                      { zip: { contains: location, mode: 'insensitive' } },
                    ],
                  },
                },
              }
            : {},

          type
            ? {
                RealEstate: {
                  is: {
                    feature: {
                      has: type,
                    },
                  },
                },
              }
            : {},
        ],
      },
      include: {
        RealEstate: true,
        seller: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return ApiResponse.success(
      products,
      'Real estate products fetched successfully',
    );
  }

  async findProductBySellerId(sellerId: string) {
    const products = await this.prisma.product.findMany({
      where: { sellerId },
      include: {
        seller: {
          select: {
            id: true,
            phone: true,
            address: true,
            companyName: true,
            companyWebsite: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return ApiResponse.success(products, 'Products fetched successfully');
  }

  async deleteProduct(id: string) {
    try {
      const product = await this.prisma.product.delete({
        where: { id },
      });
      return ApiResponse.success(product, 'Product deleted successfully');
    } catch (error) {
      return ApiResponse.error(
        'Failed to delete product, please try again later',
        error,
      );
    }
  }

  async updateProduct(productId: string, updateDto: UpdateProductDto) {
    try {
      const {
        name,
        description,
        price,
        trending,
        RealEstate,
        Car,
        Watch,
        Yacht,
        Jewellery,
      } = updateDto;

      const productUpdateData: any = {
        name,
        description,
        price,
        trending,
      };

      // Add relational updates conditionally
      if (RealEstate) {
        productUpdateData.RealEstate = {
          update: RealEstate,
        };
      }
      if (Car) {
        productUpdateData.Car = {
          update: Car,
        };
      }
      if (Watch) {
        productUpdateData.Watch = {
          update: Watch,
        };
      }
      if (Yacht) {
        productUpdateData.Yacht = {
          update: Yacht,
        };
      }
      if (Jewellery) {
        productUpdateData.Jewellery = {
          update: Jewellery,
        };
      }

      const result = await this.prisma.product.update({
        where: { id: productId },
        data: productUpdateData,
        include: {
          seller: true,
          RealEstate: true,
          Car: true,
          Watch: true,
          Yacht: true,
          Jewellery: true,
        },
      });

      return result;
    } catch (error) {
      return ApiResponse.error(
        'Failed to update product, please try again later',
        error,
      );
    }
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
