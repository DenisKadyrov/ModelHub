import { Request, Response } from 'express';
import { uploadModel } from '../services/models';

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
