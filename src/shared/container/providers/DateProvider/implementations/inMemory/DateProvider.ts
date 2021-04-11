import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';

import { ICompareDateDTO } from '@shared/dtos/ICompareDateDTO';

class DateProviderInMemory implements IDateProvider {
  convertToUTC(date: Date): string {
    return new Date(date).toISOString();
  }

  compareInHours({ start_date, end_date }: ICompareDateDTO): number {
    return Math.round(
      Math.abs(start_date.getTime() - end_date.getTime()) / 3600000,
    );
  }

  dateNow() {
    return new Date();
  }

  compareInDays({ start_date, end_date }: ICompareDateDTO): number {
    return start_date.getTime() - end_date.getTime();
  }

  addDays(days: number): Date {
    const dateNow = new Date();

    const newDate = dateNow.setDate(dateNow.getDate() + days);

    return new Date(newDate);
  }

  addHours(hours: number): Date {
    const dateNow = new Date();

    const newDate = dateNow.setHours(dateNow.getHours() + hours);

    return new Date(newDate);
  }
}

export { DateProviderInMemory };
