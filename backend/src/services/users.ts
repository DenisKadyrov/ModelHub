import bcrypt from 'bcryptjs';

import { AppError } from '../utils/errors';
import { findUserByEmail, createUser } from '../repositories/users';

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
