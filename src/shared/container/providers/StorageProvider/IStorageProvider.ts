import { ISaveFileInStorageDTO } from '@shared/dtos/ISaveFileInStorageDTO';

interface IStorageProvider {
  save(data: ISaveFileInStorageDTO): Promise<string>;
  delete(data: ISaveFileInStorageDTO): Promise<void>;
}

export { IStorageProvider };
