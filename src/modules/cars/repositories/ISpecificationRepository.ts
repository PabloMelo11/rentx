import { Specification } from '../models/Specification';

interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

interface ISpecificationRepository {
  create(data: ICreateSpecificationDTO): void;
  findByName(name: string): Specification | undefined;
}

export { ISpecificationRepository, ICreateSpecificationDTO };
