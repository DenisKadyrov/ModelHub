import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errors';
import { tokenVerify } from '../utils/jwt';
import { UserPayload } from '../services/users';

export function authenticate(req: Request, res: Response, next: NextFunction) {
  console.log(req.cookies)
  const token = req.cookies['authcookie'];
  // const token = req.headers.authorization?.split(' ')[1];

  if (!token) throw new AppError("Unauthorized", 401);

  try {
    const user = tokenVerify<UserPayload>(token);
    req.user = user;
    next();
  } catch {
    throw new AppError('Invalid or expired token', 403);
  }
}