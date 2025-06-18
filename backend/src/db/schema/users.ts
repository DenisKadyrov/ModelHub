import { integer, pgTable, serial, varchar } from 'drizzle-orm/pg-core';
import { timestamps } from '../column.helpers'

export const usersTable = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  passwordHash: varchar('password_hash').notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  ...timestamps,
});
