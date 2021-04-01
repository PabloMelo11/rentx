import { container } from 'tsyringe';

import '@shared/container/providers';

import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';
import { CategoriesRepositoryPostgres } from '@modules/cars/infra/typeorm/repositories/postgres/CategoriesRepository';

import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository';
import { SpecificationsRepositoryPostgres } from '@modules/cars/infra/typeorm/repositories/postgres/SpecificationRepository';

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { UsersRepositoryPostgres } from '@modules/accounts/infra/typeorm/repositories/postgres/UsersRepository';

import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { CarsRepositoryPostgres } from '@modules/cars/infra/typeorm/repositories/postgres/CarsRepository';

import { ICarImagesRepository } from '@modules/cars/repositories/ICarImagesRepository';
import { CarImagesRepositoryPostgres } from '@modules/cars/infra/typeorm/repositories/postgres/CarImagesRepository';

import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { RentalsRepositoryPostgres } from '@modules/rentals/infra/typeorm/repositories/postgres/RentalsRepository';

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepositoryPostgres,
);

container.registerSingleton<ISpecificationsRepository>(
  'SpecificationsRepository',
  SpecificationsRepositoryPostgres,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepositoryPostgres,
);

container.registerSingleton<ICarsRepository>(
  'CarsRepository',
  CarsRepositoryPostgres,
);

container.registerSingleton<ICarImagesRepository>(
  'CarImagesRepository',
  CarImagesRepositoryPostgres,
);

container.registerSingleton<IRentalsRepository>(
  'RentalsRepository',
  RentalsRepositoryPostgres,
);
