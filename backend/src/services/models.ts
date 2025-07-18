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
  ModelResponse,
  ModelsListResponse
} from '../types/models';
import { v4 as uuidv4 } from 'uuid';

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
    filename: filename,
    description: data.description,
    userId: data.userId,
    framework: data.framework,
    path,
  });
  return toModelResponse(record);
};

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

export async function deleteModelById(id: number) {
  const res = await deleteOneModel(id);
  return res;
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toModelResponse(model: any): ModelResponse {
  return {
    id: model.id,
    userId: model.userId,
    name: model.name,
    description: model.description,
    framework: model.framework,
    path: model.path,
    createdAt: model.createdAt.toISOString(),
    updatedAt: model.updatedAt.toISOString()
  };
}
