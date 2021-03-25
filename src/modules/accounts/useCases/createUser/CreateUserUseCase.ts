import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../errors/AppError';

import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';

import { IUsersRepository } from '../../repositories/IUsersRepository';
import { IHashProvider } from '../../providers/HashProvider/IHashProvider';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  async execute({
    driver_license,
    email,
    name,
    password,
  }: ICreateUserDTO): Promise<void> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError('User already exists');
    }

    const passwordHash = await this.hashProvider.generateHash(password);

    await this.usersRepository.create({
      driver_license,
      email,
      name,
      password: passwordHash,
    });
  }
}

export { CreateUserUseCase };
