import { ICompareDateDTO } from '@shared/dtos/ICompareDateDTO';

interface IDateProvider {
  convertToUTC(date: Date): string;
  compareInHours(data: ICompareDateDTO): number;
  dateNow(): Date;
  compareInDays(data: ICompareDateDTO): number;
  addDays(days: number): Date;
}

export { IDateProvider };
