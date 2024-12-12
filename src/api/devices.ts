import { Device } from '../types/Device';
import { client } from '../utils/sendRequest';

export const getAllDevices = async () => {
  return client.get<Device[]>('/api/devices/getAllDevices');
};

export const getDevice = async (id: string) => {
  return client.get<Device>(`/api/devices/getDevice/${id}`);
};

export const getUserDevices = async () => {
  return client.get<Device[]>('/api/devices/getOwnerDevices');
};

export const postDevice = async (deviceInfo: FormData) => {
  return client.post('/api/devices/addDevice', deviceInfo);
};
