import { apiClient } from './axios'
import { Vehicle } from '../types/vehicle'

export const addVehicle = async (request: Vehicle ): Promise<Vehicle> => {
  try {
    const response = await apiClient.post('/vehicles', request);
    return response.data;
  } catch {
    throw new Error('Add vehicle error occurred');
  }
};
export const getVehicleByUserId = async (userId: number): Promise<Vehicle[]> => {
  try {
    const response = await apiClient.get(`/vehicles/user/${userId}`);
    return response.data;
  } catch {
    throw new Error('Get vehicle by userId error occurred');
  }
};
export const updateVehicleById = async (id: number, request: Vehicle): Promise<Vehicle> => {
  try {
    const response = await apiClient.put(`/vehicles/${id}`, request);
    return response.data;
  } catch {
    throw new Error('Vehicle update error occurred')
  }
}
export const deleteVehicleById = async (id: number): Promise<Vehicle> => {
  try {
    const response = await apiClient.delete(`/vehicles/${id}`);
    return response.data;
  } catch {
    throw new Error('Vehicle delete error occurred')
  }
}
