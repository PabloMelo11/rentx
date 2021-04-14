import { container } from 'tsyringe';

import { IHashProvider } from '@shared/container/providers/HashProvider/IHashProvider';
import { HashProviderBCrypt } from '@shared/container/providers/HashProvider/implementations/bcrypt/HashProvider';

import { ITokenProvider } from '@shared/container/providers/TokenProvider/ITokenProvider';
import { TokenProviderJsonWebToken } from '@shared/container/providers/TokenProvider/implementations/jsonwebtoken/TokenProvider';

import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { DateProviderDayjs } from '@shared/container/providers/DateProvider/implementations/dayjs/DateProvider';

import { IMailProvider } from '@shared/container/providers/MailProvider/IMailProvider';
import { MailProviderEthereal } from '@shared/container/providers/MailProvider/implementations/ethereal/MailProvider';
import { MailProviderSES } from '@shared/container/providers/MailProvider/implementations/ses/MailProvider';

import { IStorageProvider } from '@shared/container/providers/StorageProvider/IStorageProvider';
import { StorageProviderS3 } from '@shared/container/providers/StorageProvider/implementations/s3/StorageProvider';
import { StorageProviderInMemory } from '@shared/container/providers/StorageProvider/implementations/inMemory/StorageProvider';

container.registerSingleton<IHashProvider>('HashProvider', HashProviderBCrypt);

container.registerSingleton<ITokenProvider>(
  'TokenProvider',
  TokenProviderJsonWebToken,
);

container.registerSingleton<IDateProvider>('DateProvider', DateProviderDayjs);

const mailProvider = {
  ethereal: container.resolve(MailProviderEthereal),
  ses: container.resolve(MailProviderSES),
};

container.registerInstance<IMailProvider>(
  'MailProvider',
  mailProvider[process.env.MAIL],
);

const diskStorage = {
  local: StorageProviderInMemory,
  s3: StorageProviderS3,
};

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  diskStorage[process.env.DISK],
);
