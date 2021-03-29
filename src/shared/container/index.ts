import { container } from 'tsyringe';

import '../../modules/accounts/providers';

import { ICategoriesRepository } from '../../modules/cars/repositories/ICategoriesRepository';
import { PostgresCategoriesRepository } from '../../modules/cars/repositories/implementations/postgres/CategoriesRepository';

import { ISpecificationRepository } from '../../modules/cars/repositories/ISpecificationRepository';
import { PostgresSpecificationsRepository } from '../../modules/cars/repositories/implementations/postgres/SpecificationRepository';

import { IUsersRepository } from '../../modules/accounts/repositories/IUsersRepository';
import { PostgresUsersRepository } from '../../modules/accounts/repositories/implementations/PostgresUsersRepository';

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  PostgresCategoriesRepository,
);

container.registerSingleton<ISpecificationRepository>(
  'SpecificationsRepository',
  PostgresSpecificationsRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  PostgresUsersRepository,
);
