import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '../../repositories/IUsersRepository';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute(data: ICreateUserDTO): Promise<void> {
    await this.usersRepository.create(data);
  }
}

export { CreateUserUseCase };
