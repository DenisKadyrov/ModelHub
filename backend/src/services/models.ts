import { minioClient } from '../config/minio';
import { config } from '../config/config';
import {
  createModel,
  deleteOneModel,
  getListOfModels,
  getOneModel
} from '../repositories/models';
import {
  CreateModelRequest,
  Model,
  ModelResponse,
  ModelsListResponse
} from '../types/models';
import { v4 as uuidv4 } from 'uuid';
import { AppError } from '../utils/errors';

export async function uploadModel(data: CreateModelRequest): Promise<ModelResponse> {
  const extension = data.file.originalname.split('.').pop();
  const filename = `${uuidv4()}.${extension}`;
  const path = `models/${filename}`;

  // Upload to MinIO
  await minioClient.putObject(
    config.MINIO_BUCKET_NAME,
    path,
    data.file.buffer,
    data.file.buffer.length,
    {
      'Content-Type': data.file.mimetype,
    }
  );


  // Save metadata to DB
  const record = await createModel({
    name: data.name,
    description: data.description,
    userId: data.userId,
    framework: data.framework,
    size: data.file.size,
    tags: data.tags,
    readme: data.readme,
    path,
  });
  return toModelResponse(record);
}

export async function getAllModels(): Promise<ModelsListResponse> {
  const models = await getListOfModels();
  return {
    models: models.map(toModelResponse)
  };
}

export async function getModelById(id: number): Promise<ModelResponse> {
  const model = await getOneModel(id);
  return toModelResponse(model);
}

export async function getModelDownloadUrl(id: number): Promise<string> {
  const model = await getOneModel(id);
  return minioClient.presignedGetObject(config.MINIO_BUCKET_NAME, model.path, 60 * 60);
}

export async function deleteModelById(id: number, requesterId: number): Promise<{ message: string }> {
  const model = await getOneModel(id);

  if (model.userId !== requesterId) {
    throw new AppError('You can delete only your own models', 403);
  }

  await deleteOneModel(id);

  // Then delete file from MinIO
  try {
    await minioClient.removeObject(config.MINIO_BUCKET_NAME, model.path);
  } catch (error) {
    console.error('Failed to delete file from MinIO:', error);
    // Don't throw here as the database record is already deleted
  }

  return { message: 'Model deleted successfully' };
}

function toModelResponse(model: Model): ModelResponse {
  return {
    id: model.id,
    userId: model.userId,
    name: model.name,
    description: model.description,
    framework: model.framework,
    path: model.path,
    size: model.size,
    tags: model.tags,
    readme: model.readme ?? '',
    createdAt: model.createdAt.toISOString(),
    updatedAt: model.updatedAt.toISOString()
  };
}
