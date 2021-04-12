import { AppError } from '@shared/infra/http/errors/AppError';

import { CarsRepositoryInMemory } from '@modules/cars/repositories/inMemory/CarsRepository';
import { CreateCarUseCase } from '@modules/cars/useCases/createCar/CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('Create Car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it('should be able to create a new car', async () => {
    const car = await createCarUseCase.execute({
      brand: 'Brand car',
      description: 'Description car',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 100,
      name: 'Name car',
      category_id: 'category',
    });

    expect(car).toHaveProperty('id');
  });

  it('should not be able to create a car with exists license plate', async () => {
    await createCarUseCase.execute({
      brand: 'Brand car 1',
      description: 'Description car',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 100,
      name: 'Name car 1',
      category_id: 'category 1',
    });

    await expect(
      createCarUseCase.execute({
        brand: 'Brand car 2',
        description: 'Description car 2',
        daily_rate: 100,
        license_plate: 'ABC-1234',
        fine_amount: 100,
        name: 'Name car 2',
        category_id: 'category 2',
      }),
    ).rejects.toEqual(new AppError('Car already exists with license plate'));
  });

  it('should be able a car with available true by default', async () => {
    const car = await createCarUseCase.execute({
      brand: 'Brand car',
      description: 'Description car',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 100,
      name: 'Name car',
      category_id: 'category',
    });

    expect(car.available).toBe(true);
  });
});
