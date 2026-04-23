import { Request, Response } from 'express';

import { loginUser, registerUser, getUserInfo } from '../services/users';
import { config } from '../config/config';
import { AppError } from '../utils/errors';


export const userRegister = async (req: Request, res: Response) => {
  const parsed = req.body;
  const user = await registerUser(parsed);

  res.status(201).json({ user: { id: user.id, email: user.email } });
}

export const userLogin = async (req: Request, res: Response) => {
  const parsed = req.body;
  const token = await loginUser(parsed);
  res.cookie('authcookie', token, {
    maxAge: 60 * 60 * 1000,
    httpOnly: true,
    sameSite: 'lax',
    secure: config.NODE_ENV === 'production',
  });
  res.status(200).json({
    success: true,
    message: 'Logged in successfully',
  });
};

export const getUser = async (req: Request, res: Response) => {
  const id = req.user?.id;
  if (!id) throw new AppError('Unauthorized', 401);

  const userInfo = await getUserInfo(id);
  res.status(200).json({ userInfo });
};
