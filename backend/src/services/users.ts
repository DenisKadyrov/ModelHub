import bcrypt from 'bcryptjs';

import { AppError } from '../utils/errors';
import { findUserByEmail, createUser } from '../repositories/users';
import { signToken } from '../utils/jwt';

export interface UserPayload {
  id: string;
  email: string;
}

export async function registerUser(data: {
  name: string;
  email: string;
  password: string;
}) {
  const existing = await findUserByEmail(data.email);
  if (existing) throw new AppError('User already exists', 400);

  const passwordHash = await bcrypt.hash(data.password, 10);
  const user = await createUser({
    name: data.name,
    email: data.email,
    passwordHash,
  });
  return user;
}

export async function loginUser(data: {
  email: string;
  password: string;
}) {
  const user = await findUserByEmail(data.email);
  if (!user) throw new AppError('User doesn\'t exists', 401);

  const match = await bcrypt.compare(data.password, user.passwordHash);
  if (!match) throw new AppError('Invalid credentials', 401);

  const token = signToken(data);
  return token;
}

