import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';
import { z } from 'zod';
import { timestamps } from '../column.helpers'

export const usersTable = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  passwordHash: varchar('password_hash').notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  ...timestamps,
});

export const registerSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
});
