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
  readme: string;
}

export interface ProfileData {
  user: User;
  models: Model[];
}

export interface ModelUploadData {
  userId?: number,
  name: string,
  description: string,
  readme: string;
  tags: string[];
  size: number;
  framework: string,
  file: File | null,
}