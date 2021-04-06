import { getRepository, Repository } from 'typeorm';

import { Car } from '@modules/cars/infra/typeorm/entities/Car';

import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { IUpdateCarAvailableDTO } from '@modules/cars/dtos/IUpdateCarAvailableDTO';

import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { IRequestListCarsDTO } from '@modules/cars/dtos/IRequestListCarsDTO';

class CarsRepositoryPostgres implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  async create(data: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create(data);

    await this.repository.save(car);

    return car;
  }
  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.repository.findOne({
      license_plate,
    });

    return car;
  }

  async findAllAvailable({
    category_id,
    brand,
    name,
  }: IRequestListCarsDTO): Promise<Car[]> {
    const carsQuery = this.repository
      .createQueryBuilder('c')
      .where('c.available = :available', { available: true });

    if (brand) {
      carsQuery.andWhere('c.brand = :brand', { brand });
    }

    if (name) {
      carsQuery.andWhere('c.name = :name', { name });
    }

    if (category_id) {
      carsQuery.andWhere('c.category_id = :category_id', { category_id });
    }

    const cars = await carsQuery.getMany();

    return cars;
  }

  async findById(car_id: string): Promise<Car | undefined> {
    const car = await this.repository.findOne(car_id);

    return car;
  }

  async updateAvailable({
    car_id,
    available,
  }: IUpdateCarAvailableDTO): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .update()
      .set({ available })
      .where('id = :id')
      .setParameters({ id: car_id })
      .execute();
  }
}

export { CarsRepositoryPostgres };
