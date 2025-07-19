import { integer, varchar, text, serial, pgTable } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { timestamps } from '../column.helpers';
import { usersTable } from './users';

export const modelsTable = pgTable('models', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => usersTable.id).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  path: varchar('path', { length: 1024 }).notNull(),
  description: varchar('description', { length: 600 }).notNull(),
  framework: varchar('framework', { length: 255 }).notNull(),
  size: integer('size').notNull(),
  readme: text('readme'),
  tags: text('tags').array().notNull().default([]),
  ...timestamps,
});

export const modelsRelations = relations(modelsTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [modelsTable.userId],
    references: [usersTable.id],
  }),
}));
