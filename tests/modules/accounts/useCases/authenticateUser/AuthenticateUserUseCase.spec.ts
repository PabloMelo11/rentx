import { AppError } from '@shared/infra/http/errors/AppError';

import { UsersRepositoryInMemory } from '@modules/accounts/repositories/inMemory/UsersRepository';
import { UsersTokensRepositoryInMemory } from '@modules/accounts/repositories/inMemory/UsersTokensRepository';
import { DateProviderInMemory } from '@shared/container/providers/DateProvider/implementations/inMemory/DateProvider';

import { HashProviderInMemory } from '@shared/container/providers/HashProvider/implementations/inMemory/HashProvider';
import { TokenProviderInMemory } from '@shared/container/providers/TokenProvider/implementations/inMemory/TokenProvider';

import { AuthenticateUserUseCase } from '@modules/accounts/useCases/authenticateUser/AuthenticateUserUseCase';

let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;

let hashProvider: HashProviderInMemory;
let tokenProvider: TokenProviderInMemory;
let dateProvider: DateProviderInMemory;

let authenticateUserUseCase: AuthenticateUserUseCase;

describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();

    hashProvider = new HashProviderInMemory();
    tokenProvider = new TokenProviderInMemory();
    dateProvider = new DateProviderInMemory();

    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
      hashProvider,
      tokenProvider,
      usersTokensRepositoryInMemory,
      dateProvider,
    );
  });

  it('should be able to authenticate an user', async () => {
    const user = {
      driver_license: '000123',
      email: 'johndoe@example.com',
      password: '123456',
      name: 'John Doe',
    };

    await usersRepositoryInMemory.create(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty('token');
  });

  it('should not be able to authenticate an nonexistent user', async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: 'non-exists@example.com',
        password: 'non-exists',
      }),
    ).rejects.toEqual(new AppError('Email or password incorrect'));
  });

  it('should not be able to authenticate with wrong password', async () => {
    const user = {
      driver_license: '000123',
      email: 'johndoe@example.com',
      password: '123456',
      name: 'John Doe',
    };

    await usersRepositoryInMemory.create(user);

    await expect(
      authenticateUserUseCase.execute({
        email: user.email,
        password: 'wrong-password',
      }),
    ).rejects.toEqual(new AppError('Email or password incorrect'));
  });
});
