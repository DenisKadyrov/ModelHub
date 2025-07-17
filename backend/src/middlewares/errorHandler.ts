import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { AppError } from '../utils/errors';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (err instanceof ZodError) {
    res.status(400).json({ message: 'Validation error', errors: err.errors });
    return;
  }

  if (err instanceof AppError) {
    console.log(err.name);
    res.status(400).json({ message: err.message });
    return;
  }
  else {
    console.error('Unexpected error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
    return;
  }
  next();
};

