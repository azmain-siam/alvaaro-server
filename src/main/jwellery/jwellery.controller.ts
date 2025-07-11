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
