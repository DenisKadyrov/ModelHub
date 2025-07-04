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
