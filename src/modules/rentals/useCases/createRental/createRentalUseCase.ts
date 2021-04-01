import { AppError } from '@shared/errors/AppError';

import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';

import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';

import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO';

class CreateRentalUseCase {
  constructor(
    private rentalsRepository: IRentalsRepository,
    private dateProvider: IDateProvider,
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

    return rental;
  }
}

export { CreateRentalUseCase };
