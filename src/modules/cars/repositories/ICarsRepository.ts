import { Car } from '../infra/typeorm/entities/Car';

import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';

interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car | undefined>;
}

export { ICarsRepository };
