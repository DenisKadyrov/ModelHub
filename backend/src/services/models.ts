import { minioClient } from '../config/minio';
import { config } from '../config/config';
import { createModel } from '../repositories/models';
import { v4 as uuidv4 } from 'uuid';

export async function uploadModel(data: {
  userId: number,
  name: string,
  description: string,
  framework: string,
  file: Express.Multer.File,
}) {
  const extension = data.file.originalname.split('.').pop();
  const filename = `${uuidv4()}.${extension}`;
  const path = `models/${filename}`;

  // Upload to MinIO
  await minioClient.putObject(
    config.MINIO_BUCKET_NAME,
    path,
    data.file.buffer,
    data.file.buffer.length,
    {
      'Content-Type': data.file.mimetype,
    }
  );


  // Save metadata to DB
  const [record] = await createModel({
    name: data.name,
    filename: filename,
    description: data.description,
    userId: data.userId,
    framework: data.framework,
    path,
  });
  return record;
};

