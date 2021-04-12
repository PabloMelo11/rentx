import { injectable, inject } from 'tsyringe';

import { AppError } from '@shared/infra/http/errors/AppError';

import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';

import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';

import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO';

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,

    @inject('DateProvider')
    private dateProvider: IDateProvider,

    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
  ) {}

  async execute(data: ICreateRentalDTO): Promise<Rental> {
    const { car_id, expected_return_date, user_id } = data;

    const rentalOpenToCar = await this.rentalsRepository.findOpenRentalByCar(
      car_id,
    );

    if (rentalOpenToCar) {
      throw new AppError('Car is unavailable');
    }

    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(
      user_id,
    );

    if (rentalOpenToUser) {
      throw new AppError("There's a rental in progress for user");
    }

    const dateNow = this.dateProvider.dateNow();

    const compareHour = this.dateProvider.compareInHours({
      start_date: dateNow,
      end_date: expected_return_date,
    });

    if (compareHour < 24) {
      throw new AppError('Invalid return time');
    }

    const rental = await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date,
    });

    await this.carsRepository.updateAvailable({
      car_id,
      available: false,
    });

    return rental;
  }
}

export { CreateRentalUseCase };
