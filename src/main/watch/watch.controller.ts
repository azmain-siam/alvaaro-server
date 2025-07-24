import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { WatchService } from './watch.service';
import { CreateWatchDto } from './dto/create-watch.dto';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { uploadMultipleToCloudinary } from 'src/utils/common/cloudinary/cloudinary';
import { UpdateWatchDto } from './dto/update-watch.dto';

@ApiTags('watch')
@Controller('watch')
export class WatchController {
  constructor(private readonly watchService: WatchService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new watch with associated product' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('images'))
  @ApiBody({
    description: 'Create Watch DTO with product details',
    type: CreateWatchDto,
  })
  async create(
    @Body() createWatchDto: CreateWatchDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    let images: string[] = [];
    if (files && files.length > 0) {
      const uploadResults = await uploadMultipleToCloudinary(files);
      images = uploadResults.map((res: any) => res.secure_url);
    }
    return this.watchService.create(createWatchDto, images);
  }

  @Get()
  findAll() {
    return this.watchService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.watchService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWatchDto: UpdateWatchDto) {
    return this.watchService.update(id, updateWatchDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.watchService.remove(id);
  }
}
