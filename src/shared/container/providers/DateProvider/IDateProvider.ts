import { ICompareDateDTO } from '@shared/dtos/ICompareDateDTO';

interface IDateProvider {
  convertToUTC(date: Date): string;
  compareInHours(data: ICompareDateDTO): Number;
  dateNow(): Date;
}

export { IDateProvider };
