/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { CarService } from './car.service';
import { CreateCarDto } from './dto/create-car.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { uploadMultipleToCloudinary } from 'src/utils/cloudinary/cloudinary';

@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('images'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateCarDto })
  async create(
    @Body() createCarDto: CreateCarDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    let images: string[] = [];
    if (files && files.length > 0) {
      const uploadResults = await uploadMultipleToCloudinary(files);
      images = uploadResults.map((res: any) => res.secure_url);
    }

    return this.carService.create(createCarDto, images);
  }

  @Get()
  findAll() {
    return this.carService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carService.remove(id);
  }
}
