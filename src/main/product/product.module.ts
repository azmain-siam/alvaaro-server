import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { HelperModule } from 'src/utils/helper/helper.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [HelperModule, AuthModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
