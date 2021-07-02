import { Test, TestingModule } from '@nestjs/testing';
import { BrandsController } from './brands.controller';
import { BrandsService } from './brands.service';

const mockBrandsServices = () => ({
  create: jest.fn(),
});

const mockBrand = {
  id: 'some id',
  name: 'some brand',
};

describe('BrandsController', () => {
  let controller: BrandsController;
  let brandsService: BrandsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BrandsController],
      providers: [{ provide: BrandsService, useFactory: mockBrandsServices }],
    }).compile();

    controller = module.get<BrandsController>(BrandsController);
    brandsService = module.get<BrandsService>(BrandsService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Call brandsService.create and return new brand', async () => {
    const req = { name: 'Audi' };
    jest.spyOn(brandsService, 'create').mockResolvedValue(mockBrand);

    const result = await controller.create(req);
    expect(brandsService.create).toHaveBeenCalledWith(req);
    expect(result).toEqual(mockBrand);
  });
});
