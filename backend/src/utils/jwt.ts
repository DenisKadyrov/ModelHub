import jwt from 'jsonwebtoken';
import { config } from '../config/config'


export function signToken(payload: object) {
  return jwt.sign(payload, config.JWT_SECRET, { expiresIn: '1h' });
}

export function tokenVerify<T>(token: string): T {
  return jwt.verify(token, config.JWT_SECRET) as T;
}
