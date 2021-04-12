import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/infra/http/errors/AppError';

import { Car } from '@modules/cars/infra/typeorm/entities/Car';

import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository';

import { IRequestCreateCarSpecificationDTO } from '@modules/cars/dtos/IRequestCreateCarSpecificationDTO';

@injectable()
class CreateCarSpecificationUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,

    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationsRepository,
  ) {}

  async execute({
    car_id,
    specifications_id,
  }: IRequestCreateCarSpecificationDTO): Promise<Car> {
    const car = await this.carsRepository.findById(car_id);

    if (!car) {
      throw new AppError('Car does not exists', 404);
    }

    const specifications = await this.specificationsRepository.findByIds(
      specifications_id,
    );

    car.specifications = specifications;

    await this.specificationsRepository.create(car);

    return car;
  }
}

export { CreateCarSpecificationUseCase };
