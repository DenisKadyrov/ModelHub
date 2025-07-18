export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: string;
}

export interface Model {
  id: string;
  name: string;
  description: string;
  tags: string[];
  userId: string;
  createdAt: string;
  updatedAt: string;
  fileSize?: number;
  downloadCount?: number;
}

export interface ProfileData {
  user: User;
  models: Model[];
}