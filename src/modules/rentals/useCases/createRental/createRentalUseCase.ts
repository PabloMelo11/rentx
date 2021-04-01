import { AppError } from '@shared/errors/AppError';

import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';

import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO';

class CreateRentalUseCase {
  constructor(private rentalsRepository: IRentalsRepository) {}

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

    const rental = await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date,
    });

    return rental;
  }
}

export { CreateRentalUseCase };
