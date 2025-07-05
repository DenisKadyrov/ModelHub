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
}
