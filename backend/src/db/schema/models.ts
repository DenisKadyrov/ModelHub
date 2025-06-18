import { integer, varchar, serial, pgTable } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { timestamps } from '../column.helpers';
import { usersTable } from './users.ts';

export const modelsTable = pgTable('models', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => usersTable.id),
  name: varchar('name', { length: 255 }).notNull(),
  description: varchar('description', { length: 600 }).notNull(),
  framework: varchar('framework', { length: 255 }).notNull(),
  ...timestamps,
});

