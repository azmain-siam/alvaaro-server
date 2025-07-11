/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
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
import { JewelleryService } from './jwellery.service';
import { CreateJewelleryDto } from './dto/create-jwellery.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { uploadMultipleToCloudinary } from 'src/utils/cloudinary/cloudinary';

@Controller('jwellery')
export class JwelleryController {
  constructor(private readonly jwelleryService: JewelleryService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('images'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateJewelleryDto })
  async create(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() createCarDto: CreateJewelleryDto,
  ) {
    let images: string[] = [];
    if (files && files.length > 0) {
      const uploadResults = await uploadMultipleToCloudinary(files);
      images = uploadResults.map((res: any) => res.secure_url);
    }
    const sellerId = '88b6b5fe-6d9a-45f0-a03b-c5bcb2e6cce3';
    return this.jwelleryService.create(createCarDto, images, sellerId);
  }
  @Get()
  findAll() {
    return this.jwelleryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jwelleryService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jwelleryService.remove(id);
  }
}
