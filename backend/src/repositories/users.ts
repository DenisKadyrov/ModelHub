import { db } from '../config/db';
import { usersTable } from '../db/schema/users';
import { eq } from 'drizzle-orm';

export async function findUserByEmail(email: string) {
  const result = await db.select().from(usersTable).where(eq(usersTable.email, email));
  return result[0];
}

export async function createUser(data: { name: string; email: string; passwordHash: string }) {
  const result = await db.insert(usersTable).values(data).returning();
  return result[0];
}

export async function findUserById(id: number) {
  const result = await db.query.usersTable.findFirst({
    where: eq(usersTable.id, id),
    with: {
      models: {
        columns: {
          name: true,
          description: true,
          tags: true,
          size: true,
          createdAt: true,
        }
      }
    }
  });
  return result;
}