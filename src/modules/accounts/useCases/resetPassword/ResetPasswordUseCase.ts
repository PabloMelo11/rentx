import { injectable, inject } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';

import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { IHashProvider } from '@modules/accounts/providers/HashProvider/IHashProvider';

import { IRequestResetPasswordDTO } from '@modules/accounts/dtos/IRequestResetPasswordDTO';

@injectable()
class ResetPasswordUseCase {
  constructor(
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('DateProvider')
    private dateProvider: IDateProvider,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  async execute({ token, password }: IRequestResetPasswordDTO): Promise<void> {
    const userToken = await this.usersTokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('Token invalid');
    }

    const compareIfBefore = this.dateProvider.compareIfBefore({
      start_date: userToken.expires_date,
      end_date: this.dateProvider.dateNow(),
    });

    if (compareIfBefore) {
      throw new AppError('Token expired');
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    const passwordHash = await this.hashProvider.generateHash(password);

    user.password = passwordHash;

    await this.usersRepository.create(user);

    await this.usersTokensRepository.deleteById(userToken.id);
  }
}

export { ResetPasswordUseCase };
