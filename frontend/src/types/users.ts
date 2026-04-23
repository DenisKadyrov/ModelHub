import type { Model } from './models';

export interface UserData {
  id: number;
  name: string;
  email: string;
  models: Model[];
  createdAt: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  createdAt: string;
}
