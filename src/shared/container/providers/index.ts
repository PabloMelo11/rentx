import { container } from 'tsyringe';

import '@modules/accounts/providers';

import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { DateProviderDayjs } from '@shared/container/providers/DateProvider/implementations/dayjs/DateProvider';

import { IMailProvider } from '@shared/container/providers/MailProvider/IMailProvider';
import { MailProviderEthereal } from '@shared/container/providers/MailProvider/implementations/ethereal/MailProvider';

container.registerSingleton<IDateProvider>('DateProvider', DateProviderDayjs);

container.registerInstance<IMailProvider>(
  'MailProvider',
  new MailProviderEthereal(),
);
