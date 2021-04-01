import { injectable, inject } from 'tsyringe';

import { ICarImagesRepository } from '@modules/cars/repositories/ICarImagesRepository';

import { IRequestUploadCarImagesDTO } from '@modules/cars/dtos/IRequestUploadCarImagesDTO';

@injectable()
class UploadCarImagesUseCase {
  constructor(
    @inject('CarImagesRepository')
    private carImagesRepository: ICarImagesRepository,
  ) {}

  async execute(data: IRequestUploadCarImagesDTO): Promise<void> {
    data.images_name.map(async image => {
      await this.carImagesRepository.create({
        car_id: data.car_id,
        image_name: image,
      });
    });
  }
}

export { UploadCarImagesUseCase };
