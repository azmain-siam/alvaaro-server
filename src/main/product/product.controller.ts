import {
  Controller,
  Patch,
  Param,
  Post,
  Body,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { CreateRealEstateDto } from '../real-estate/dto/create-real-estate.dto';
import { CreateCarDto } from '../car/dto/create-car.dto';
import { CreateWatchDto } from '../watch/dto/create-watch.dto';
import { CreateYachtDto } from '../yacht/dto/create-yacht.dto';
import { CreateJewelleryDto } from '../jwellery/dto/create-jwellery.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('real-estate')
  @UseInterceptors(FilesInterceptor('images'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateRealEstateDto })
  async createRealEstateProduct(
    @UploadedFiles() images: Express.Multer.File[],
    @Body() createProductDto: CreateRealEstateDto,
  ) {
    const sellerId = 'efcbe1d7-75b3-4ee2-a1b8-41152506d1a4';
    return this.productService.handleProductCreation(
      createProductDto,
      images,
      sellerId,
    );
  }

  @Post('car')
  @UseInterceptors(FilesInterceptor('images'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateCarDto })
  async createCarProduct(
    @UploadedFiles() images: Express.Multer.File[],
    @Body() createProductDto: CreateCarDto,
  ) {
    const sellerId = 'efcbe1d7-75b3-4ee2-a1b8-41152506d1a4';
    return this.productService.handleProductCreation(
      createProductDto,
      images,
      sellerId,
    );
  }

  @Post('watch')
  @UseInterceptors(FilesInterceptor('images'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateWatchDto })
  async createWatchProduct(
    @UploadedFiles() images: Express.Multer.File[],
    @Body() createProductDto: CreateWatchDto,
  ) {
    const sellerId = 'efcbe1d7-75b3-4ee2-a1b8-41152506d1a4';
    return this.productService.handleProductCreation(
      createProductDto,
      images,
      sellerId,
    );
  }

  @Post('yacht')
  @UseInterceptors(FilesInterceptor('images'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateYachtDto })
  async createYachtProduct(
    @UploadedFiles() images: Express.Multer.File[],
    @Body() createProductDto: CreateYachtDto,
  ) {
    const sellerId = 'efcbe1d7-75b3-4ee2-a1b8-41152506d1a4';
    return this.productService.handleProductCreation(
      createProductDto,
      images,
      sellerId,
    );
  }

  @Post('jewellery')
  @UseInterceptors(FilesInterceptor('images'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateJewelleryDto })
  async createJewelleryProduct(
    @UploadedFiles() images: Express.Multer.File[],
    @Body() createProductDto: CreateJewelleryDto,
  ) {
    const sellerId = 'efcbe1d7-75b3-4ee2-a1b8-41152506d1a4';
    return this.productService.handleProductCreation(
      createProductDto,
      images,
      sellerId,
    );
  }

  @Patch('trending/:id')
  update(@Param('id') id: string) {
    return this.productService.update(id);
  }
}
