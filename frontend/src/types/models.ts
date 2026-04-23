export interface Model {
  id: number;
  userId: number;
  name: string;
  description: string;
  framework: string;
  path: string;
  size: number;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  downloadCount?: number;
  readme: string;
}

export interface ModelUploadData {
  name: string,
  description: string,
  readme: string;
  tags: string[];
  framework: string,
  file: File | null,
}
