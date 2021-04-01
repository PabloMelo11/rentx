import { getRepository, Repository } from 'typeorm';

import { CarImage } from '@modules/cars/infra/typeorm/entities/CarImage';

import { ICarImagesRepository } from '@modules/cars/repositories/ICarImagesRepository';
import { IUploadCarImagesDTO } from '@modules/cars/dtos/IUploadCarImagesDTO';

class CarImagesRepositoryPostgres implements ICarImagesRepository {
  private repository: Repository<CarImage>;

  constructor() {
    this.repository = getRepository(CarImage);
  }

  async create({ car_id, image_name }: IUploadCarImagesDTO): Promise<CarImage> {
    const carImage = this.repository.create({
      car_id,
      image_name,
    });

    await this.repository.save(carImage);

    return carImage;
  }
}

export { CarImagesRepositoryPostgres };
