import { injectable, inject } from 'tsyringe';

import { Car } from '@modules/cars/infra/typeorm/entities/Car';

import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { IRequestListCarsDTO } from '@modules/cars/dtos/IRequestListCarsDTO';

@injectable()
class ListAvailableCarsUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
  ) {}

  async execute({
    brand,
    category_id,
    name,
  }: IRequestListCarsDTO): Promise<Car[]> {
    const cars = await this.carsRepository.findAllAvailable({
      brand,
      category_id,
      name,
    });

    return cars;
  }
}

export { ListAvailableCarsUseCase };
