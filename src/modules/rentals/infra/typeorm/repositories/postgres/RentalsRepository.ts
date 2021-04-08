import { Repository, getRepository } from 'typeorm';

import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';

import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO';

class RentalsRepositoryPostgres implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }

  async create(data: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create(data);

    await this.repository.save(rental);

    return rental;
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental | undefined> {
    const openByCar = await this.repository.findOne({ car_id });

    return openByCar;
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental | undefined> {
    const openByUser = await this.repository.findOne({ user_id });

    return openByUser;
  }

  async findById(rental_id: string): Promise<Rental | undefined> {
    const rental = await this.repository.findOne(rental_id);

    return rental;
  }
}

export { RentalsRepositoryPostgres };
