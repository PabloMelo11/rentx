import { AppError } from '@shared/errors/AppError';

import { UsersRepositoryInMemory } from '@modules/accounts/repositories/inMemory/UsersRepository';
import { UsersTokensRepositoryInMemory } from '@modules/accounts/repositories/inMemory/UsersTokensRepository';

import { DateProviderInMemory } from '@shared/container/providers/DateProvider/implementations/inMemory/DateProvider';
import { MailProviderInMemory } from '@shared/container/providers/MailProvider/implementations/inMemory/MailProvider';

import { SendForgotPasswordMailUseCase } from '@modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailUseCase';

let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;

let dateProvider: DateProviderInMemory;
let mailProvider: MailProviderInMemory;

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;

describe('Send forgot password mail', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();

    dateProvider = new DateProviderInMemory();
    mailProvider = new MailProviderInMemory();

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider,
    );
  });

  it('should be able to send a forgot password mail to user', async () => {
    const sendMail = spyOn(mailProvider, 'sendMail');

    await usersRepositoryInMemory.create({
      driver_license: '123456',
      email: 'johndoe@example.com',
      name: 'John doe',
      password: '123456',
    });

    await sendForgotPasswordMailUseCase.execute('johndoe@example.com');

    expect(sendMail).toBeCalled();
  });

  it('should not be able to send mail if user does not exists', async () => {
    const sendMail = spyOn(mailProvider, 'sendMail');

    await expect(
      sendForgotPasswordMailUseCase.execute('johndoe@example.com'),
    ).rejects.toBeInstanceOf(AppError);

    expect(sendMail).not.toBeCalled();
  });

  it('should be able to create an user token', async () => {
    const generateTokenMail = spyOn(usersTokensRepositoryInMemory, 'create');

    await usersRepositoryInMemory.create({
      driver_license: '123456',
      email: 'johndoe@example.com',
      name: 'John doe',
      password: '123456',
    });

    await sendForgotPasswordMailUseCase.execute('johndoe@example.com');

    expect(generateTokenMail).toBeCalled();
  });
});
