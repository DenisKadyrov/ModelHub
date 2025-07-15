import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

// Schema for env variables
const envSchema = z.object({
  PORT: z.string().default('3000'),
  DB_URL: z.string().url({
    message: 'DB_URL must have valid url',
  }),
  JWT_SECRET: z.string(),
  MINIO_ENDPOINT: z.string(),
  MINIO_PORT: z.string().default('9003'),
  MINIO_USE_SSL: z.string(),
  MINIO_ACCESS_KEY: z.string(),
  MINIO_SECRET_KEY: z.string(),
  BUCKET_NAME: z.string(),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error(' Invalid environment variables:', _env.error.format())
  process.exit(1)
}

const env = _env.data

// Typed config object
export const config = {
  PORT: Number(env.PORT),
  DB_URL: env.DB_URL,
  JWT_SECRET: env.JWT_SECRET,
  MINIO_ENDPOINT: env.MINIO_ENDPOINT,
  MINIO_PORT: env.MINIO_PORT,
  MINIO_USE_SSL: env.MINIO_USE_SSL,
  MINIO_ACCESS_KEY: env.MINIO_ACCESS_KEY,
  MINIO_SECRET_KEY: env.MINIO_SECRET_KEY,
  MINIO_BUCKET_NAME: env.BUCKET_NAME,
}
