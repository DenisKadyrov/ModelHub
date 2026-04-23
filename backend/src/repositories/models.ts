import { desc, eq } from 'drizzle-orm';
import { db } from '../config/db';
import { modelsTable } from '../db/schema/models';
import { Model } from '../types/models';
import { AppError } from '../utils/errors';

export const createModel = async (data: {
  userId: number;
  name: string;
  description: string;
  framework: string;
  readme?: string;
  size: number;
  tags?: string[];
  path: string;
}): Promise<Model> => {
  const [model] = await db.insert(modelsTable).values({
    ...data,
    createdAt: new Date(),
    updatedAt: new Date(),
  }).returning();
  if (!model) throw new AppError('Failed to create model', 500);

  return model;
};

export const getListOfModels = async (): Promise<Model[]> => {
  return db.select().from(modelsTable).orderBy(desc(modelsTable.createdAt));
};

export const getOneModel = async (id: number): Promise<Model> => {
  const [model] = await db.select().from(modelsTable).where(eq(modelsTable.id, id));
  if (!model) throw new AppError('Model not found', 404);
  return model;
};

export const deleteOneModel = async (id: number): Promise<Model> => {
  const [deletedModel] = await db.delete(modelsTable).where(eq(modelsTable.id, id)).returning();
  if (!deletedModel) throw new AppError('Model not found', 404);
  return deletedModel;
};
