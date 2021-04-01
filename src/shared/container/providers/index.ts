import { container } from 'tsyringe';

import '@modules/accounts/providers';

import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { DateProviderDayjs } from '@shared/container/providers/DateProvider/implementations/dayjs/DateProvider';

container.registerSingleton<IDateProvider>('DateProvider', DateProviderDayjs);
