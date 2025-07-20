import api from "./axios";

interface CreateModelResponse {
  success: boolean;
  message: string;
};

export const createModel = async (formData: FormData): Promise<CreateModelResponse> => {
  const response = await api.post<CreateModelResponse>(
    '/models',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
    }
  );
  return response.data;
};