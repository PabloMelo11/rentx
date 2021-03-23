import { Repository, getRepository } from 'typeorm';
import { Specification } from '../../entities/Specification';
import {
  ISpecificationRepository,
  ICreateSpecificationDTO,
} from '../ISpecificationRepository';

class PostgresSpecificationRepository implements ISpecificationRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }

  async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const speficiation = this.repository.create({
      name,
      description,
    });

    await this.repository.save(speficiation);
  }

  async findByName(name: string): Promise<Specification | undefined> {
    const speficiation = await this.repository.findOne({ where: { name } });

    return speficiation;
  }
}

export { PostgresSpecificationRepository };
