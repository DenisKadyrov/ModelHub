import { UserPayload } from '../services/users';

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}
