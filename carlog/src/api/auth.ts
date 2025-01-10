import axios from 'axios';
import { LoginResponse, LoginParams } from '../types/login'
import { RegisterResponse, RegisterParams } from '../types/register'
import { TokenPayload } from '../types/token'
import { jwtDecode } from 'jwt-decode'



const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
export const decodeToken = (): TokenPayload => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error('Invalid token', error);
    }
  }
  return null;
}

export const login = async (credentials: LoginParams): Promise<LoginResponse> => {
  try {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data;
  } catch {
    throw new Error('Login failed');
  }
};

export const register = async (params: RegisterParams): Promise<RegisterResponse> => {
  try {
    const response = await apiClient.post('/auth/register', params);
    return response.data;
  } catch {
    throw new Error('Login failed');
  }
}
