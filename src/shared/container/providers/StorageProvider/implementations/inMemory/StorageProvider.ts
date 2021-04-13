import fs from 'fs';
import { resolve } from 'path';

import upload from '@config/upload';

import { IStorageProvider } from '../../IStorageProvider';

import { ISaveFileInStorageDTO } from '@shared/dtos/ISaveFileInStorageDTO';

class StorageProviderInMemory implements IStorageProvider {
  async save({ file, folder }: ISaveFileInStorageDTO): Promise<string> {
    await fs.promises.rename(
      resolve(upload.tmpFolder, file),
      resolve(`${upload.tmpFolder}/${folder}`, file),
    );

    return file;
  }

  async delete({ file, folder }: ISaveFileInStorageDTO): Promise<void> {
    const filename = resolve(`${upload.tmpFolder}/${folder}`, file);

    try {
      await fs.promises.stat(filename);
    } catch {
      return;
    }

    await fs.promises.unlink(filename);
  }
}

export { StorageProviderInMemory };
