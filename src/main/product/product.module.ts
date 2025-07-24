import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { HelperModule } from 'src/utils/helper/helper.module';

@Module({
  imports: [HelperModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
