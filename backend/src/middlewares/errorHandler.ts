import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { AppError } from '../utils/errors';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ZodError) {
    return res.status(400).json({ message: 'Validation error', errors: err.errors });
  }

  if (err instanceof AppError) {
    console.log(err.name);
    return res.status(400).json({ message: err.message});
  }
  else {
    console.error('Unexpected error:', err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
  next();
};

