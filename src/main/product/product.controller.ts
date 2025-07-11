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
// import { CreateProductWithFilesDto } from './dto/create-product-with-files.dto';
import { uploadMultipleToCloudinary } from 'src/utils/cloudinary/cloudinary';
import { CreateRealEstateDto } from '../real-estate/dto/create-real-estate.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('real-estate')
  @UseInterceptors(FilesInterceptor('images'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateRealEstateDto })
  async create(
    @UploadedFiles() images: Express.Multer.File[],
    @Body() createProductDto: CreateRealEstateDto,
  ) {
    const cloudinaryUrls =
      images?.length > 0
        ? (await uploadMultipleToCloudinary(images)).map(
            (res: { secure_url: string }) => res.secure_url,
          )
        : [];
    const sellerId = 'efcbe1d7-75b3-4ee2-a1b8-41152506d1a4';
    return this.productService.createRealEstateProduct(
      createProductDto,
      cloudinaryUrls,
      sellerId,
    );
  }

  @Patch('trending/:id')
  update(@Param('id') id: string) {
    return this.productService.update(id);
  }
}
