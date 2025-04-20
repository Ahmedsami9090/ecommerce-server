import { Test, TestingModule } from '@nestjs/testing';
import { Categories } from './categories';

describe('Categories', () => {
  let provider: Categories;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Categories],
    }).compile();

    provider = module.get<Categories>(Categories);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
