import { container } from 'tsyringe';

import '../../modules/accounts/providers';

import { ICategoriesRepository } from '../../modules/cars/repositories/ICategoriesRepository';
import { CategoriesRepositoryPostgres } from '../../modules/cars/repositories/implementations/postgres/CategoriesRepository';

import { ISpecificationRepository } from '../../modules/cars/repositories/ISpecificationRepository';
import { SpecificationsRepositoryPostgres } from '../../modules/cars/repositories/implementations/postgres/SpecificationRepository';

import { IUsersRepository } from '../../modules/accounts/repositories/IUsersRepository';
import { UsersRepositoryPostgres } from '../../modules/accounts/repositories/implementations/postgres/UsersRepository';

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepositoryPostgres,
);

container.registerSingleton<ISpecificationRepository>(
  'SpecificationsRepository',
  SpecificationsRepositoryPostgres,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepositoryPostgres,
);
