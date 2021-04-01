import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';

import { ISpecificationRepository } from '../ISpecificationRepository';
import { ICreateSpecificationDTO } from '@modules/cars/dtos/ICreateSpecificationDTO';

class SpecificationsRepositoryInMemory implements ISpecificationRepository {
  private specifications: Specification[] = [];

  async create(data: ICreateSpecificationDTO): Promise<Specification> {
    const specification = new Specification();

    Object.assign(specification, data);

    this.specifications.push(specification);

    return specification;
  }

  async findByName(name: string): Promise<Specification | undefined> {
    const specification = this.specifications.find(
      specification => specification.name === name,
    );

    return specification;
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    const specifications = this.specifications.filter(specification =>
      ids.includes(specification.id),
    );

    return specifications;
  }
}

export { SpecificationsRepositoryInMemory };
