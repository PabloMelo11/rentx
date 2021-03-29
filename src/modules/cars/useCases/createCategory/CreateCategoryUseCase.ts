import { inject, injectable } from 'tsyringe';

import { AppError } from '@errors/AppError';

import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';
import { ICreateCategoryDTO } from '@modules/cars/dtos/ICreateCategoryDTO';

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  async execute({ name, description }: ICreateCategoryDTO): Promise<void> {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(
      name,
    );

    if (categoryAlreadyExists) {
      throw new AppError('Category already exists');
    }

    await this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
