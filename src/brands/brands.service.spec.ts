import {
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { BrandsRepository } from './brands.repository';
import { BrandsService } from './brands.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { Brand } from './entities/brand.entity';

const mockBrandsRepository = () => ({
  create: jest.fn(),
  save: jest.fn(),
});

const mockBrand = {
  id: 'some id',
  name: 'some brand',
};

describe('BrandsService', () => {
  let service: BrandsService;
  let brandsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BrandsService,
        { provide: BrandsRepository, useFactory: mockBrandsRepository },
      ],
    }).compile();

    service = module.get<BrandsService>(BrandsService);
    brandsRepository = module.get<BrandsRepository>(BrandsRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Create', () => {
    it('should be create new brand', async () => {
      const req: CreateBrandDto = { name: 'Audi' };
      jest.spyOn(brandsRepository, 'create').mockResolvedValue(mockBrand);

      const result = await service.create(req);
      expect(brandsRepository.create).toHaveBeenCalledWith(req);
      expect(brandsRepository.save).toHaveBeenCalled();
      expect(result).toEqual(mockBrand);
    });

    it('should be return InternalServerErrorException', async () => {
      const req: CreateBrandDto = { name: 'Audi' };
      jest.spyOn(brandsRepository, 'create').mockResolvedValue(null);
      jest.spyOn(brandsRepository, 'save').mockImplementation(() => {
        throw new Error('Problemas al realizar la operacion');
      });

      expect(service.create(req)).rejects.toThrow(InternalServerErrorException);
    });
  });
});
