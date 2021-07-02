import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BrandsModule } from './brands/brands.module';
import { configValidationSchema } from './config.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
      validationSchema: configValidationSchema,
    }),
    BrandsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
