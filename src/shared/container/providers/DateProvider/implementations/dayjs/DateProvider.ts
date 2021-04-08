import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';

import { ICompareDateDTO } from '@shared/dtos/ICompareDateDTO';

class DateProviderDayjs implements IDateProvider {
  convertToUTC(date: Date): string {
    return dayjs(date).utc().local().format();
  }

  compareInHours({ start_date, end_date }: ICompareDateDTO): number {
    const start_date_utc = this.convertToUTC(start_date);
    const end_date_utc = this.convertToUTC(end_date);

    return dayjs(end_date_utc).diff(start_date_utc, 'hours');
  }

  dateNow() {
    return dayjs().toDate();
  }

  compareInDays({ start_date, end_date }: ICompareDateDTO): number {
    const start_date_utc = this.convertToUTC(start_date);
    const end_date_utc = this.convertToUTC(end_date);

    return dayjs(end_date_utc).diff(start_date_utc, 'days');
  }
}

export { DateProviderDayjs };
