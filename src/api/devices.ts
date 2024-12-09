import { Device } from '../types/Device';
import { client } from '../utils/sendRequest';

export const getAllDevices = async () => {
  return client.get<Device[]>('/api/devices/getAllDevices');
};

export const postDevice = async (deviceInfo: FormData) => {
  return client.post('/api/devices/addDevice', deviceInfo);
};
