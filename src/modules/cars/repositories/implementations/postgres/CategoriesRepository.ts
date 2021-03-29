import { Repository, getRepository } from 'typeorm';

import { Category } from '@modules/cars/entities/Category';
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';
import { ICreateCategoryDTO } from '@modules/cars/dtos/ICreateCategoryDTO';

class CategoriesRepositoryPostgres implements ICategoriesRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Category);
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = this.repository.create({
      name,
      description,
    });

    await this.repository.save(category);
  }

  async list(): Promise<Category[]> {
    return this.repository.find();
  }

  async findByName(name: string): Promise<Category | undefined> {
    const category = await this.repository.findOne({ where: { name } });

    return category;
  }
}

export { CategoriesRepositoryPostgres };
