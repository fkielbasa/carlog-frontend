import { apiClient } from './axios'
import { Service } from '../types/service'
import { Vehicle } from '../types/vehicle'

export const addServiceEntry = async (request: Service): Promise<Service> => {
  try {
    return (await apiClient.post(`/services`, request)).data;
  } catch {
    throw new Error('Error adding new service');
  }
}
export const getServiceByVehicleId = async (vehicleId: number): Promise<Service[]> => {
  try {
    return  (await apiClient.get(`/services/vehicle/${vehicleId}`)).data;
  } catch {
    throw new Error('Get service by vehicle id error');
  }
}
export const getServicesByUserId = async (userId: number): Promise<Service[]> => {
  try {
    return (await apiClient.get(`/services/user/${userId}`)).data;
  } catch {
    throw new Error('Get service by user id error');
  }
}
