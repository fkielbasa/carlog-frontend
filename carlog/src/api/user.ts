import { apiClient } from './axios'
import { Client, Mechanic } from '../types/user'

export const getClientData = async (id: number ): Promise<Client> => {
  try {
    return (await apiClient.get(`/vehicle/${id}`)).data;
  } catch {
    throw new Error('Get client data error occurred');
  }
};
export const getMechanicData = async (id: number ): Promise<Mechanic> => {
  try {
    return (await apiClient.get(`/service/${id}`)).data;
  } catch {
    throw new Error('Get mechanic data error occurred');
  }
};
export const getUserData = async (id: number): Promise<Client | Mechanic> => {
  try {
    return (await apiClient.get(`/users/${id}`)).data
  } catch {
    throw new Error("Get user data error")
  }
}
