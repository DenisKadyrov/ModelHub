import { integer, varchar, text, serial, pgTable } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { z } from 'zod';
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

const tagsSchema = z.preprocess((value) => {
  if (Array.isArray(value)) {
    return value;
  }

  if (typeof value === 'string') {
    const normalized = value.trim();

    if (!normalized) {
      return [];
    }

    try {
      const parsed = JSON.parse(normalized);

      if (Array.isArray(parsed)) {
        return parsed;
      }
    } catch {
      return normalized.split(',').map((tag) => tag.trim());
    }
  }

  return value;
}, z.array(z.string().trim().min(1).max(50)).max(20).optional().default([]))
  .transform((tags) => Array.from(new Set(tags.map((tag) => tag.trim()))));

export const createModelSchema = z.object({
  name: z.string().trim().min(1).max(255),
  description: z.string().trim().min(1).max(600),
  framework: z.string().trim().min(1).max(255),
  readme: z.string().trim().max(50_000).optional().default(''),
  tags: tagsSchema,
});
