import { IUploadCarImagesDTO } from '../dtos/IUploadCarImagesDTO';
import { CarImage } from '../infra/typeorm/entities/CarImage';

interface ICarImagesRepository {
  create(data: IUploadCarImagesDTO): Promise<CarImage>;
}

export { ICarImagesRepository };
