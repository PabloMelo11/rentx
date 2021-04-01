import { AppError } from '@shared/errors/AppError';

import { CarsRepositoryInMemory } from '@modules/cars/repositories/inMemory/CarsRepository';
import { SpecificationsRepositoryInMemory } from '@modules/cars/repositories/inMemory/SpecificationsRepository';
import { CreateCarSpecificationUseCase } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationUseCase';

let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;
let createCarSpecificationUseCase: CreateCarSpecificationUseCase;

describe('Create Car Specification', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();

    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory,
    );
  });

  it('should not be able to add a new specification to a non-existent car', async () => {
    expect(async () => {
      const car_id = '123';
      const specifications_id = ['123', '456', '789'];

      await createCarSpecificationUseCase.execute({
        car_id,
        specifications_id,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to add a new specification to the car', async () => {
    const car = await carsRepositoryInMemory.create({
      brand: 'Brand car',
      description: 'Description car',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 100,
      name: 'Name car',
      category_id: 'category',
    });

    const specification = await specificationsRepositoryInMemory.create({
      name: 'new specification',
      description: 'new specification',
    });

    const specifications_id = [specification.id];

    const specificationsCars = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id,
    });

    expect(specificationsCars).toHaveProperty('specifications');
    expect(specificationsCars.specifications.length).toBe(1);
  });
});
