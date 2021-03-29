import { AppError } from '../../../../../src/errors/AppError';

import { UsersRepositoryInMemory } from '../../../../../src/modules/accounts/repositories/implementations/inMemory/UsersRepository';
import { HashProviderInMemory } from '../../../../../src/modules/accounts/providers/HashProvider/implementations/inMemory/HashProvider';
import { TokenProviderInMemory } from '../../../../../src/modules/accounts/providers/TokenProvider/implementations/inMemory/TokenProvider';
import { AuthenticateUserUseCase } from '../../../../../src/modules/accounts/useCases/authenticateUser/AuthenticateUserUseCase';

let usersRepositoryInMemory: UsersRepositoryInMemory;
let hashProvider: HashProviderInMemory;
let tokenProvider: TokenProviderInMemory;

let authenticateUserUseCase: AuthenticateUserUseCase;

describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    hashProvider = new HashProviderInMemory();
    tokenProvider = new TokenProviderInMemory();

    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
      hashProvider,
      tokenProvider,
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

  it('should not be able to authenticate an nonexistent user', () => {
    expect(async () => {
      const result = await authenticateUserUseCase.execute({
        email: 'non-exists@example.com',
        password: 'non-exists',
      });

      expect(result).toHaveProperty('token');
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', () => {
    expect(async () => {
      const user = {
        driver_license: '000123',
        email: 'johndoe@example.com',
        password: '123456',
        name: 'John Doe',
      };

      await usersRepositoryInMemory.create(user);

      await authenticateUserUseCase.execute({
        email: user.email,
        password: 'wrong-password',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
