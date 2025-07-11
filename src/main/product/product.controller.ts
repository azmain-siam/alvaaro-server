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
import { CreateProductDto } from './dto/create-product.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
// import { CreateProductWithFilesDto } from './dto/create-product-with-files.dto';
import { uploadMultipleToCloudinary } from 'src/utils/cloudinary/cloudinary';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('images'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Product creation with images',
    type: CreateProductDto,
  })
  async create(
    @UploadedFiles() images: Express.Multer.File[],
    @Body() createProductDto: CreateProductDto,
  ) {
    const cloudinaryUrls =
      images?.length > 0
        ? (await uploadMultipleToCloudinary(images)).map(
            (res: { secure_url: string }) => res.secure_url,
          )
        : [];
    const sellerId = '67f689cb-f13a-457c-be55-5a9b9df49b08';
    return this.productService.create(
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
