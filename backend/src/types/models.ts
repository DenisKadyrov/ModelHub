export interface Model {
  id: number;
  userId: number;
  name: string;
  description: string;
  framework: string;
  path: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateModelRequest {
  userId: number,
  name: string,
  description: string,
  framework: string,
  file: Express.Multer.File,
}

export interface ModelResponse {
  id: number;
  userId: number;
  name: string;
  description: string;
  framework: string;
  path: string;
  createdAt: string;
  updatedAt: string;
}

export interface ModelsListResponse {
  models: ModelResponse[];
}

