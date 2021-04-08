import { injectable, inject } from 'tsyringe';

import { Car } from '@modules/cars/infra/typeorm/entities/Car';

import { AppError } from '@shared/errors/AppError';

import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';

@injectable()
class CreateCarUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
  ) {}

  async execute(data: ICreateCarDTO): Promise<Car> {
    const carAlreadyExists = await this.carsRepository.findByLicensePlate(
      data.license_plate,
    );

    if (carAlreadyExists) {
      throw new AppError('Car already exists with license plate');
    }

    const car = await this.carsRepository.create(data);

    return car;
  }
}

export { CreateCarUseCase };
