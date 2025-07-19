import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from '../db/schema/index';
import postgres from 'postgres';

import { config } from './config'

export const db = drizzle(postgres(config.DB_URL), { schema });
