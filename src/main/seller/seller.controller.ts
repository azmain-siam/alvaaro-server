import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { SellerService } from './seller.service';
import { CreateSellerDto } from './dto/create-seller.dto';
import { UpdateSellerDto } from './dto/update-seller.dto';
import { AuthGuard } from 'src/guards/jwt-auth.guard';
import { Request } from 'express';

@UseGuards(AuthGuard)
@Controller('seller')
export class SellerController {
  constructor(private readonly sellerService: SellerService) {}

  @Post()

  create(@Body() createSellerDto: CreateSellerDto, @Req() req: Request) {
    return this.sellerService.create(createSellerDto, req['userid'] as string);

  create(@Body() createSellerDto: CreateSellerDto) {
    const userId = '5c5e6159-3c0b-4596-bda9-f87726f28a32';

    return this.sellerService.create(createSellerDto, userId);

  }

  @Get()
  findAll() {
    return this.sellerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sellerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSellerDto: UpdateSellerDto) {
    return this.sellerService.update(+id, updateSellerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sellerService.remove(+id);
  }
}
