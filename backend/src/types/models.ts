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

export interface UploadedFile {
  buffer: Buffer;
  fieldname: string;
  mimetype: string;
  originalname: string;
  size: number;
}

export interface CreateModelRequest {
  userId: number,
  name: string,
  description: string,
  readme: string;
  tags: string[];
  framework: string,
  file: UploadedFile,
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
