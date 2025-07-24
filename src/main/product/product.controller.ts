import {
  Controller,
  Patch,
  Param,
  Post,
  Body,
  UseInterceptors,
  UploadedFiles,
  Get,
  Query,
  Req,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiQuery } from '@nestjs/swagger';
import { CreateRealEstateDto } from '../real-estate/dto/create-real-estate.dto';
import { CreateCarDto } from '../car/dto/create-car.dto';
import { CreateWatchDto } from '../watch/dto/create-watch.dto';
import { CreateYachtDto } from '../yacht/dto/create-yacht.dto';
import { CreateJewelleryDto } from '../jwellery/dto/create-jwellery.dto';
import { CategoryType } from '@prisma/client';
import { RealEstateSearchQueryDto } from './dto/real-estate-search.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Roles } from 'src/guards/roles.decorator';
import { UserRole } from 'src/utils/common/enum/userEnum';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('real-estate')
  @Roles(UserRole.SELLER)
  @UseInterceptors(FilesInterceptor('images'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateRealEstateDto })
  async createRealEstateProduct(
    @UploadedFiles() images: Express.Multer.File[],
    @Body() createProductDto: CreateRealEstateDto,
    @Req() req: { userid: string },
  ) {
    return this.productService.handleProductCreation(
      createProductDto,
      images,
      req.userid,
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
    const sellerId = '36c77915-cd87-486d-af89-90b94bf9b453';
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
    const sellerId = '36c77915-cd87-486d-af89-90b94bf9b453';
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
    const sellerId = '36c77915-cd87-486d-af89-90b94bf9b453';
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
    const sellerId = '36c77915-cd87-486d-af89-90b94bf9b453';
    return this.productService.handleProductCreation(
      createProductDto,
      images,
      sellerId,
    );
  }

  @Get()
  @ApiQuery({ name: 'category', enum: CategoryType, required: false })
  async findAllProducts(@Query('category') category?: CategoryType) {
    return this.productService.findAllProducts(category);
  }

  @Get('/real-estate/search')
  @ApiQuery({ name: 'location', required: false })
  @ApiQuery({ name: 'minPrice', required: false })
  @ApiQuery({ name: 'maxPrice', required: false })
  @ApiQuery({ name: 'type', required: false })
  searchRealEstate(@Query() query?: RealEstateSearchQueryDto) {
    console.log(query);
    return this.productService.searchRealEstate(query);
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.productService.deleteProduct(id);
  }

  @Get('/seller/:sellerId')
  findProductBySellerId(@Param('sellerId') sellerId: string) {
    return this.productService.findProductBySellerId(sellerId);
  }

  @Patch(':id')
  @ApiConsumes('application/json')
  async updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const updatedProduct = await this.productService.updateProduct(
      id,
      updateProductDto,
    );
    if (!updatedProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return updatedProduct;
  }

  @Patch('trending/:id')
  update(@Param('id') id: string) {
    return this.productService.update(id);
  }
}
