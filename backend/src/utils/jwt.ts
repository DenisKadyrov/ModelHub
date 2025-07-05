import jwt from 'jsonwebtoken';
import { config } from '../config/config'


export function signToken(payload: object, expiresIn = '1h') {
  return jwt.sign(payload, config.JWT_SECRET, { expiresIn });
}

export function tokenVerify<T>(token: string): T {
  return jwt.verify(token, config.JWT_SECRET) as T;
}
