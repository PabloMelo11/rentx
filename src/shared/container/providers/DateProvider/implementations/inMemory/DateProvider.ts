import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';

import { ICompareDateDTO } from '@shared/dtos/ICompareDateDTO';

class DateProviderInMemory implements IDateProvider {
  convertToUTC(date: Date): string {
    return new Date(date).toISOString();
  }

  compareInHours({ start_date, end_date }: ICompareDateDTO): Number {
    return Math.round(
      Math.abs(start_date.getTime() - end_date.getTime()) / 3600000,
    );
  }

  dateNow() {
    return new Date();
  }
}

export { DateProviderInMemory };
