import { UserPayload } from '../services/users';
import { UploadedFile } from './models';

declare global {
  namespace Express {
    interface Request {
      file?: UploadedFile;
      user?: UserPayload;
    }
  }
}
