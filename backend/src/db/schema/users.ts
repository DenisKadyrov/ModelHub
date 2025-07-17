import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { z } from 'zod';
import { timestamps } from '../column.helpers'
import { modelsTable } from './models';

export const usersTable = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  passwordHash: varchar('password_hash').notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  ...timestamps,
});

export const usersRelations = relations(usersTable, ({ many }) => ({
  models: many(modelsTable),
}));

export const registerSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
});

export const authSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});