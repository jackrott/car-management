import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BrandsRepository } from './brands.repository';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(BrandsRepository)
    private brandsRepository: BrandsRepository,
  ) {}

  async create(createBrandDto: CreateBrandDto): Promise<Brand> {
    const { name } = createBrandDto;
    const brand = this.brandsRepository.create({ name });
    try {
      await this.brandsRepository.save(brand);
    } catch (error) {
      if (error.code === '23505') {
        // Duplicate username
        throw new ConflictException(`La marca: ${name} existe actualmente`);
      } else {
        throw new InternalServerErrorException();
      }
    }
    return brand;
  }

  findAll() {
    return `This action returns all brands`;
  }

  findOne(id: number) {
    return `This action returns a #${id} brand`;
  }

  update(id: number, updateBrandDto: UpdateBrandDto) {
    return `This action updates a #${id} brand`;
  }

  remove(id: number) {
    return `This action removes a #${id} brand`;
  }
}
