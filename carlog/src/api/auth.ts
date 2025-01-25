import axios from 'axios';
import { LoginResponse, LoginParams } from '../types/login'
import { RegisterResponse, RegisterParams } from '../types/register'
import { TokenPayload } from '../types/token'
import { jwtDecode } from 'jwt-decode'
import { apiClient } from './axios'


export const decodeToken = (): TokenPayload | null => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const decoded = jwtDecode<TokenPayload>(token);
      localStorage.setItem('role', decoded.Role);
      return decoded
    } catch (error) {
      console.error('Invalid token', error);
      localStorage.removeItem('token');
    }
  }
  return null;
};
export const getUserId = (): string | null => {
  const decodedToken = decodeToken();
  return decodedToken ? decodedToken.id : null;
};
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
