import api from './axios';

interface RegisterData {
  email: string;
  password: string;
  name: string;
}

interface RegisterResponse {
  user: {
    id: string;
    email: string;
  };
}

export const register = async (data: RegisterData): Promise<RegisterResponse> => {
  const response = await api.post<RegisterResponse>('/users/signup', data);
  return response.data;
};
