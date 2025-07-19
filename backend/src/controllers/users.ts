import { Request, Response } from 'express';

import { loginUser, registerUser, getUserInfo } from '../services/users';


export const userRegister = async (req: Request, res: Response) => {
  const parsed = req.body;
  const user = await registerUser(parsed);

  res.status(201).json({ user: { id: user.id, email: user.email } });
}

export const userLogin = async (req: Request, res: Response) => {
  const parsed = req.body;
  const token = await loginUser(parsed);
  res.cookie('authcookie', token, { maxAge: 900000, httpOnly: true })
  res.status(200).json({
    success: true,
    token: token, // just for test
    message: 'Logged in successfully',
  });
}

export const getUser = async (req: Request, res: Response) => {
  const id = req.user?.id;
  if (!id) {
    console.log("error");
    return
  }
  const userInfo = await getUserInfo(parseInt(id, 10));
  res.status(200).json({ userInfo });
}