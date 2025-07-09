import { Injectable } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { PrismaService } from '../prisma-service/prisma-service.service';

@Injectable()
export class CarService {
  constructor(private prisma: PrismaService) {}
  create(createCarDto: CreateCarDto, images: string[]) {
    console.log('Received createCarDto:', createCarDto);
    console.log('Received images:', images);
    const productData = {
      sellerId: '34355f4b-2c3d-4e5f-8a9b-0c1d2e3f4g5h',
      name: createCarDto.name,
      description: createCarDto.description,
      price: createCarDto.price,
      images,
      category: createCarDto.category,
    };
    console.log('Product data to be created:', productData);
    // const carData = {
    //   condition: createCarDto.condition,
    //   manufacture: createCarDto.manufacture,
    //   year: createCarDto.year,
    //   model: createCarDto.model,
    //   carBodyStyle: createCarDto.carBodyStyle,
    //   transmission: createCarDto.transmission,
    //   mileage: createCarDto.mileage,
    //   cylinders: createCarDto.cylinders,
    //   tractionType: createCarDto.tractionType,
    //   fuelType: createCarDto.fuelType,
    // };

    // const product = await this.prisma.product.create({
    //   data: productData,
    // });
    return 'This action adds a new car';
  }

  findAll() {
    return `This action returns all car`;
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
