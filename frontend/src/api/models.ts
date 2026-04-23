import type { AxiosProgressEvent } from 'axios';
import type { Model } from '../types/models';
import api from './axios';

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const createModel = async (
  formData: FormData,
  onProgress?: (progress: number) => void,
): Promise<Model> => {
  const response = await api.post<ApiResponse<Model>>('/models', formData, {
    onUploadProgress: (event: AxiosProgressEvent) => {
      if (!onProgress || !event.total) {
        return;
      }

      onProgress(Math.round((event.loaded * 100) / event.total));
    },
  });

  return response.data.data;
};

export const getModel = async (id: number): Promise<Model> => {
  const response = await api.get<ApiResponse<Model>>(`/models/${id}`);
  return response.data.data;
};

export const deleteModel = async (id: number): Promise<{ success: boolean; message: string }> => {
  const response = await api.delete<{ success: boolean; message: string }>(`/models/${id}`);
  return response.data;
};
