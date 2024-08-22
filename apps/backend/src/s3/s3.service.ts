import 'multer';
import { Injectable } from '@nestjs/common';
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { v4 as uuid } from 'uuid';

@Injectable()
export class S3Service {
  private s3: S3Client;
  private bucketName = process.env.S3_BUCKET_NAME;

  constructor() {
    this.s3 = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const key = `${uuid()}-${file.originalname}`;
    const uploadParams = {
      Bucket: this.bucketName,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    await this.s3.send(new PutObjectCommand(uploadParams));
    return key;
  }

  async deleteFile(key: string): Promise<void> {
    const deleteParams = {
      Bucket: this.bucketName,
      Key: key,
    };

    await this.s3.send(new DeleteObjectCommand(deleteParams));
  }

  getFileUrl(key: string): string {
    return `https://${this.bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
  }
}
