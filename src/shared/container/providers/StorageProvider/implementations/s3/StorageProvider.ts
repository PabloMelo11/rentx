import fs from 'fs';
import mime from 'mime';
import { resolve } from 'path';
import { S3 } from 'aws-sdk';

import upload from '@config/upload';

import { IStorageProvider } from '../../IStorageProvider';

import { ISaveFileInStorageDTO } from '@shared/dtos/ISaveFileInStorageDTO';

class StorageProviderS3 implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new S3({
      region: process.env.AWS_BUCKET_REGION,
    });
  }

  async save({ file, folder }: ISaveFileInStorageDTO): Promise<string> {
    const original_name = resolve(upload.tmpFolder, file);

    const file_content = await fs.promises.readFile(original_name);
    const content_type = mime.getType(original_name);

    await this.client
      .putObject({
        Bucket: `${process.env.AWS_BUCKET}/${folder}`,
        Key: file,
        ACL: 'public-read',
        Body: file_content,
        ContentType: content_type,
      })
      .promise();

    await fs.promises.unlink(original_name);

    return file;
  }

  async delete({ file, folder }: ISaveFileInStorageDTO): Promise<void> {
    this.client
      .deleteObject({
        Bucket: `${process.env.AWS_BUCKET}/${folder}`,
        Key: file,
      })
      .promise();
  }
}

export { StorageProviderS3 };
