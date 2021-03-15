import { Specification } from '../../models/Specification';
import {
  ISpecificationRepository,
  ICreateSpecificationDTO,
} from '../ISpecificationRepository';

class SpeficitionRepository implements ISpecificationRepository {
  private speficiations: Specification[];

  constructor() {
    this.speficiations = [];
  }

  create({ name, description }: ICreateSpecificationDTO): void {
    const speficiation = new Specification();

    Object.assign(speficiation, {
      name,
      description,
      created_at: new Date(),
    });

    this.speficiations.push(speficiation);
  }

  findByName(name: string): Specification | undefined {
    const speficiation = this.speficiations.find(
      specification => specification.name === name,
    );

    return speficiation;
  }
}

export { SpeficitionRepository };
