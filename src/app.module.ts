import { Module } from '@nestjs/common';
import { BrandsModule } from './brands/brands.module';

@Module({
  imports: [BrandsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
