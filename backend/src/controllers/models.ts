import { Request, Response } from 'express';
import { uploadModel, getAllModels, getModelById } from '../services/models';

export const handleModelUpload = async (req: Request, res: Response) => {
  const parsed = req.body;
  const file = req.file;

  if (!file) {
    res.status(400).json({ message: 'Name and file are required.' });
    return;
  }

  const model = await uploadModel({
    ...parsed,
    file,
  });
  res.status(201).json({ model });
};

export const getModels = async (req: Request, res: Response) => {
  const models = await getAllModels();
  res.status(200).json({ models: [models] });
};

export const getModel = async (req: Request, res: Response) => {
  const model = await getModelById(parseInt(req.params.id, 10));
  res.status(200).json({ model: model })
};