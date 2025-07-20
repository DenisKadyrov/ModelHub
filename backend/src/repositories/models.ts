import { eq } from 'drizzle-orm';
import { db } from '../config/db';
import { modelsTable } from '../db/schema/models';
import { Model } from '../types/models';

export const createModel = async (data: {
  userId: number;
  name: string;
  description: string;
  framework: string;
  readme?: string;
  size: number;
  tags?: string[];
  filename: string;
  path: string;
}): Promise<Model> => {
  const [model] = await db.insert(modelsTable).values({
    ...data,
    createdAt: new Date(),
    updatedAt: new Date(),
  }).returning();
  if (!model) throw new Error('Filed to create model');

  return model;
};

export const getListOfModels = async (): Promise<Model[]> => {
  const models = await db.select().from(modelsTable);
  if (!models) throw new Error('Model');
  return models;
};

export const getOneModel = async (id: number): Promise<Model> => {
  const [model] = await db.select().from(modelsTable).where(eq(modelsTable.id, id))
  if (!model) throw new Error('Model');
  return model;
};

export const deleteOneModel = async (id: number): Promise<Model> => {
  const [deletedModel] = await db.delete(modelsTable).where(eq(modelsTable.id, id));
  if (!deletedModel) throw new Error('Model');
  return deletedModel;

}