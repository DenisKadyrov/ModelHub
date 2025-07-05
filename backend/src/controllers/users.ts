import { Request, Response } from 'express';

import { loginUser, registerUser } from '../services/users';


export const userRegister = async (req: Request, res: Response) => {
  const parsed = req.body;
  const user = await registerUser(parsed);

  res.status(201).json({ user: { id: user.id, email: user.email } });
}

export const userLogin = async (req: Request, res: Response) => {
  const parsed = req.body;
  const user = await loginUser(parsed);
  res.status(200).json(user);
}