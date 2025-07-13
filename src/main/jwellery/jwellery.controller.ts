/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Controller, Get, Param, Delete } from '@nestjs/common';
import { JewelleryService } from './jwellery.service';

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
