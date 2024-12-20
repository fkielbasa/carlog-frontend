import axios from 'axios';
import { LoginResponse, LoginParams } from '../types/login'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const login = async (credentials: LoginParams): Promise<LoginResponse> => {
  try {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data;
  } catch {
    throw new Error('Login failed');
  }
};
