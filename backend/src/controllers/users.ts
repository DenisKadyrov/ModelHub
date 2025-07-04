import { Request, Response } from 'express';

import { registerUser } from '../services/users';


export const userRegister = async (req: Request, res: Response) => {
  const parsed = req.body;
  const user = await registerUser(parsed);

  res.status(201).json({ user: { id: user.id, email: user.email } });
};
