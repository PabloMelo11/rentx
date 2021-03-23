import { container } from 'tsyringe';

import { ICategoriesRepository } from '../../modules/cars/repositories/ICategoriesRepository';
import { PostgresCategoriesRepository } from '../../modules/cars/repositories/implementations/PostgresCategoriesRepository';

import { ISpecificationRepository } from '../../modules/cars/repositories/ISpecificationRepository';
import { PostgresSpecificationRepository } from '../../modules/cars/repositories/implementations/PostgresSpecificationRepository';

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  PostgresCategoriesRepository,
);

container.registerSingleton<ISpecificationRepository>(
  'SpeficiationsRepository',
  PostgresSpecificationRepository,
);
