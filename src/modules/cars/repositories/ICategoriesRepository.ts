import { Category } from '../infra/typeorm/entities/Category';

import { ICreateCategoryDTO } from '@modules/cars/dtos/ICreateCategoryDTO';

interface ICategoriesRepository {
  findByName(name: string): Promise<Category | undefined>;
  list(): Promise<Category[]>;
  create(data: ICreateCategoryDTO): Promise<void>;
}

export { ICategoriesRepository };
