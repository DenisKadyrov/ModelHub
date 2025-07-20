export interface Model {
  id: number;
  userId: number;
  name: string;
  description: string;
  framework: string;
  path: string;
  tags: string[];
  readme: string | null;
  size: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateModelRequest {
  userId: number,
  name: string,
  description: string,
  readme: string;
  tags: string[];
  size: number;
  framework: string,
  file: Express.Multer.File,
}

export interface ModelResponse {
  id: number;
  userId: number;
  name: string;
  description: string;
  framework: string;
  size: number;
  readme: string;
  tags: string[];
  path: string;
  createdAt: string;
  updatedAt: string;
}

export interface ModelsListResponse {
  models: ModelResponse[];
}

