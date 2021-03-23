import { container } from 'tsyringe';

import { ICategoriesRepository } from '../../modules/cars/repositories/ICategoriesRepository';
import { PostgresCategoriesRepository } from '../../modules/cars/repositories/implementations/PostgresCategoriesRepository';

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  PostgresCategoriesRepository,
);
