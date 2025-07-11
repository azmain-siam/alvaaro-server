import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RealEstateService } from './real-estate.service';
import { CreateRealEstateDto } from './dto/create-real-estate.dto';
import { UpdateRealEstateDto } from './dto/update-real-estate.dto';

@Controller('real-estate')
export class RealEstateController {
  constructor(private readonly realEstateService: RealEstateService) {}

  @Post()
  create(@Body() createRealEstateDto: CreateRealEstateDto) {
    return this.realEstateService.create(createRealEstateDto);
  }

  @Get()
  findAll() {
    return this.realEstateService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.realEstateService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRealEstateDto: UpdateRealEstateDto) {
    return this.realEstateService.update(+id, updateRealEstateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.realEstateService.remove(+id);
  }
}
