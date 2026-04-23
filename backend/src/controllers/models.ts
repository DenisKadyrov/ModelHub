import { Request, Response } from 'express';
import { createModelSchema } from '../db/schema/models';
import { uploadModel, getAllModels, getModelById, deleteModelById, getModelDownloadUrl } from '../services/models';
import { AppError, assertNumberId } from '../utils/errors';

export const handleModelUpload = async (req: Request, res: Response) => {
  const file = req.file;
  const userId = req.user?.id;

  if (!file) {
    throw new AppError('Model file is required', 400);
  }

  if (!userId) {
    throw new AppError('Unauthorized', 401);
  }

  const parsed = createModelSchema.parse(req.body);

  const model = await uploadModel({
    ...parsed,
    userId,
    file,
  });
  res.status(201).json({
    success: true,
    data: model,
    message: 'Model uploaded successfully'
  });

};

export const getModels = async (_req: Request, res: Response) => {
  const models = await getAllModels();
  res.status(200).json({
    success: true,
    data: models
  });

};

export const getModel = async (req: Request, res: Response) => {
  const model = await getModelById(assertNumberId(req.params.id, 'model'));
  res.status(200).json({
    success: true,
    data: model

  });
};

export const downloadModel = async (req: Request, res: Response) => {
  const downloadUrl = await getModelDownloadUrl(assertNumberId(req.params.id, 'model'));
  res.redirect(downloadUrl);
};

export const deleteModel = async (req: Request, res: Response) => {
  const requesterId = req.user?.id;

  if (!requesterId) {
    throw new AppError('Unauthorized', 401);
  }

  const deleteRes = await deleteModelById(assertNumberId(req.params.id, 'model'), requesterId);
  res.status(200).json({
    success: true,
    message: deleteRes.message
  });
};
