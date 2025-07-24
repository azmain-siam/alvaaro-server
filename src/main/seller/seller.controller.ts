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
import { AuthGuard } from 'src/guards/auth.guard';
import { Request } from 'express';
import { OtpDto } from '../auth/dto/signin.dto';

@UseGuards(AuthGuard)
@Controller('seller')
export class SellerController {
  constructor(private readonly sellerService: SellerService) {}

  @Post('create-seller')
  sendOtpAndCacheInfo(
    @Body() createSellerDto: CreateSellerDto,
    @Req() req: Request,
  ) {
    return this.sellerService.sendOtpAndCacheInfo(
      createSellerDto,
      req['email'] as string,
    );
  }
  @Post('otp')
  verifyOtpAndCreate(@Body() otp: OtpDto, @Req() req: Request) {
    return this.sellerService.verifyOtpAndCreate(
      otp,
      req['userid'] as string,
      req['email'] as string,
    );
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
