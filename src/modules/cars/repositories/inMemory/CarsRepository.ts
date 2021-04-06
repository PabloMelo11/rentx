import { Car } from '@modules/cars/infra/typeorm/entities/Car';

import { ICarsRepository } from '../ICarsRepository';

import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { IRequestListCarsDTO } from '@modules/cars/dtos/IRequestListCarsDTO';
import { IUpdateCarAvailableDTO } from '@modules/cars/dtos/IUpdateCarAvailableDTO';

class CarsRepositoryInMemory implements ICarsRepository {
  private cars: Car[] = [];

  async create(data: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, data);

    this.cars.push(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car | undefined> {
    const car = await this.cars.find(
      car => car.license_plate === license_plate,
    );

    return car;
  }

  async findAllAvailable({
    category_id,
    brand,
    name,
  }: IRequestListCarsDTO): Promise<Car[]> {
    const cars = this.cars.filter(car => {
      if (
        car.available === true ||
        (brand && car.brand === brand) ||
        (category_id && car.category_id === category_id) ||
        (name && car.name === name)
      ) {
        return car;
      }
    });

    return cars;
  }

  async findById(car_id: string): Promise<Car | undefined> {
    const car = await this.cars.find(car => car.id === car_id);

    return car;
  }

  async updateAvailable({
    available,
    car_id,
  }: IUpdateCarAvailableDTO): Promise<void> {
    const carIndex = this.cars.findIndex(car => car.id === car_id);

    this.cars[carIndex].available = available;
  }
}

export { CarsRepositoryInMemory };
