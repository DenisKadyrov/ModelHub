import { Client } from 'minio';
import { config } from './config';

export const minioClient = new Client({
  endPoint: config.MINIO_ENDPOINT,
  port: Number(config.MINIO_PORT),
  useSSL: config.MINIO_USE_SSL,
  accessKey: config.MINIO_ACCESS_KEY,
  secretKey: config.MINIO_SECRET_KEY,
});

