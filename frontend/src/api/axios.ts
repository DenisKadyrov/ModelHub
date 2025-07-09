import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000', // или .env
  withCredentials: true, // если используешь куки
});

export default api;
