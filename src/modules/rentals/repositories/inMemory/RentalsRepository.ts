import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';

import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO';

class RentalsRepositoryInMemory implements IRentalsRepository {
  private rentals: Rental[] = [];

  async create({
    car_id,
    expected_return_date,
    user_id,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = new Rental();

    Object.assign(rental, {
      car_id,
      expected_return_date,
      user_id,
      start_date: new Date(),
    });

    this.rentals.push(rental);

    return rental;
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental | undefined> {
    const rental = this.rentals.find(
      rental => rental.car_id === car_id && !rental.end_date,
    );

    return rental;
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental | undefined> {
    const rental = this.rentals.find(
      rental => rental.user_id === user_id && !rental.end_date,
    );

    return rental;
  }
  async findById(rental_id: string): Promise<Rental | undefined> {
    const rental = this.rentals.find(rental => rental.id === rental_id);

    return rental;
  }

  async findByUser(user_id: string): Promise<Rental[]> {
    const rentals = this.rentals.filter(rental => rental.user_id === user_id);

    return rentals;
  }
}

export { RentalsRepositoryInMemory };
