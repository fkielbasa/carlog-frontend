import { apiClient } from './axios'
import { Service } from '../types/service'

export const addServiceEntry = async (request: Service): Promise<Service> => {
  try {
    return (await apiClient.post(`/services`, request)).data;
  } catch {
    throw new Error('Error adding new service');
  }
}
