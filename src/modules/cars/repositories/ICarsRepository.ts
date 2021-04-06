import { Car } from '../infra/typeorm/entities/Car';

import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { IRequestListCarsDTO } from '../dtos/IRequestListCarsDTO';
import { IUpdateCarAvailableDTO } from '../dtos/IUpdateCarAvailableDTO';

interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car | undefined>;
  findAllAvailable(data: IRequestListCarsDTO): Promise<Car[]>;
  findById(car_id: string): Promise<Car | undefined>;
  updateAvailable(data: IUpdateCarAvailableDTO): Promise<void>;
}

export { ICarsRepository };
