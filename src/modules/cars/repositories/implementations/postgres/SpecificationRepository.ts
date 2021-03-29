import { Repository, getRepository } from 'typeorm';

import { Specification } from '@modules/cars/entities/Specification';
import { ISpecificationRepository } from '@modules/cars/repositories/ISpecificationRepository';
import { ICreateSpecificationDTO } from '@modules/cars/dtos/ICreateSpecificationDTO';

class SpecificationsRepositoryPostgres implements ISpecificationRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }

  async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const specification = this.repository.create({
      name,
      description,
    });

    await this.repository.save(specification);
  }

  async findByName(name: string): Promise<Specification | undefined> {
    const specification = await this.repository.findOne({ where: { name } });

    return specification;
  }
}

export { SpecificationsRepositoryPostgres };
