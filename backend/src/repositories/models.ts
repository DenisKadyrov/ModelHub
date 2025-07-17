import { db } from '../config/db';
import { modelsTable } from '../db/schema/models';

export const createModel = async (data: {
  userId: number;
  name: string;
  description: string;
  framework: string;
  filename: string;
  path: string;
}) => {
  return await db.insert(modelsTable).values(data).returning();
};

export const getListOfModels = async () => {
  return await db.select().from(modelsTable);
};