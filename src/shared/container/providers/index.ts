import { container } from 'tsyringe';

import { IHashProvider } from '@shared/container/providers/HashProvider/IHashProvider';
import { HashProviderBCrypt } from '@shared/container/providers/HashProvider/implementations/bcrypt/HashProvider';

import { ITokenProvider } from '@shared/container/providers/TokenProvider/ITokenProvider';
import { TokenProviderJsonWebToken } from '@shared/container/providers/TokenProvider/implementations/jsonwebtoken/TokenProvider';

import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { DateProviderDayjs } from '@shared/container/providers/DateProvider/implementations/dayjs/DateProvider';

import { IMailProvider } from '@shared/container/providers/MailProvider/IMailProvider';
import { MailProviderEthereal } from '@shared/container/providers/MailProvider/implementations/ethereal/MailProvider';

container.registerSingleton<IHashProvider>('HashProvider', HashProviderBCrypt);

container.registerSingleton<ITokenProvider>(
  'TokenProvider',
  TokenProviderJsonWebToken,
);

container.registerSingleton<IDateProvider>('DateProvider', DateProviderDayjs);

container.registerInstance<IMailProvider>(
  'MailProvider',
  new MailProviderEthereal(),
);
