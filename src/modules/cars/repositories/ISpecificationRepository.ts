import { Specification } from '@modules/cars/entities/Specification';

import { ICreateSpecificationDTO } from '@modules/cars/dtos/ICreateSpecificationDTO';

interface ISpecificationRepository {
  create(data: ICreateSpecificationDTO): Promise<void>;
  findByName(name: string): Promise<Specification | undefined>;
}

export { ISpecificationRepository };
