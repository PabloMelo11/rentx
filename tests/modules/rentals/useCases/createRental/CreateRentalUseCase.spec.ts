import dayjs from 'dayjs';

import { AppError } from '@shared/infra/http/errors/AppError';

import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/inMemory/RentalsRepository';
import { DateProviderInMemory } from '@shared/container/providers/DateProvider/implementations/inMemory/DateProvider';
import { CarsRepositoryInMemory } from '@modules/cars/repositories/inMemory/CarsRepository';

import { CreateRentalUseCase } from '@modules/rentals/useCases/createRental/createRentalUseCase';

let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dateProviderInMemory: DateProviderInMemory;
let createRentalUseCase: CreateRentalUseCase;

describe('Create Rental', () => {
  const dayAdd24Hours = dayjs().add(1, 'day').toDate();

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    dateProviderInMemory = new DateProviderInMemory();

    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dateProviderInMemory,
      carsRepositoryInMemory,
    );
  });

  it('should be able to create a new rental', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'car',
      description: 'car test',
      daily_rate: 100,
      license_plate: '123',
      fine_amount: 40,
      category_id: 'category_id',
      brand: 'brand',
    });

    const rental = await createRentalUseCase.execute({
      car_id: car.id,
      user_id: '123',
      expected_return_date: dayAdd24Hours,
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('should not be able to create a new rental if there is another open to the same user', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'car',
      description: 'car test',
      daily_rate: 100,
      license_plate: '123',
      fine_amount: 40,
      category_id: 'category_id',
      brand: 'brand',
    });

    await createRentalUseCase.execute({
      car_id: car.id,
      user_id: '123',
      expected_return_date: dayAdd24Hours,
    });

    await expect(
      createRentalUseCase.execute({
        car_id: '123',
        user_id: '123',
        expected_return_date: dayAdd24Hours,
      }),
    ).rejects.toEqual(new AppError("There's a rental in progress for user"));
  });

  it('should not be able to create a new rental if there is another open to the same car', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'car',
      description: 'car test',
      daily_rate: 100,
      license_plate: '123',
      fine_amount: 40,
      category_id: 'category_id',
      brand: 'brand',
    });

    await createRentalUseCase.execute({
      car_id: car.id,
      user_id: '123',
      expected_return_date: dayAdd24Hours,
    });

    await expect(
      createRentalUseCase.execute({
        car_id: car.id,
        user_id: '456',
        expected_return_date: dayAdd24Hours,
      }),
    ).rejects.toEqual(new AppError('Car is unavailable'));
  });

  it('should not be able to create a new rental with invalid return time', async () => {
    await expect(
      createRentalUseCase.execute({
        car_id: '123',
        user_id: '456',
        expected_return_date: new Date(),
      }),
    ).rejects.toEqual(new AppError('Invalid return time'));
  });
});
