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

interface LoginData {
  email: string;
  password: string
}

interface LoginResponse {
  success: boolean
  message: string
}


export const register = async (data: RegisterData): Promise<RegisterResponse> => {
  const response = await api.post<RegisterResponse>('/users/signup', data);
  return response.data;
};

export const login = async (data: LoginData): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>('/users/login', data);
  return response.data;
};

export const me = async () => {
  const response = await api.get('/users/me',);
  return response.data.userInfo;
}