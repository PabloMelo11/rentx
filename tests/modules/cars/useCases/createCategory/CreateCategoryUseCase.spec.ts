import { AppError } from '../../../../../src/errors/AppError';

import { CreateCategoryUseCase } from '../../../../../src/modules/cars/useCases/createCategory/CreateCategoryUseCase';
import { CategoriesRepositoryInMemory } from '../../../../../src/modules/cars/repositories/implementations/inMemory/CategoriesRepository';

let createCategoryUseCase: CreateCategoryUseCase;
let createCategoryRepositoryInMemory: CategoriesRepositoryInMemory;

describe('Create Category', () => {
  beforeEach(() => {
    createCategoryRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      createCategoryRepositoryInMemory,
    );
  });

  it('should be able to create a new category', async () => {
    const category = {
      name: 'new category test',
      description: 'new description category test',
    };

    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description,
    });

    const categoryCreated = await createCategoryRepositoryInMemory.findByName(
      category.name,
    );

    expect(categoryCreated).toHaveProperty('id');
  });

  it('should not be able to create a new category with name exists', async () => {
    expect(async () => {
      const category = {
        name: 'new category test',
        description: 'new description category test',
      };

      await createCategoryUseCase.execute({
        name: category.name,
        description: category.description,
      });

      await createCategoryUseCase.execute({
        name: category.name,
        description: category.description,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
