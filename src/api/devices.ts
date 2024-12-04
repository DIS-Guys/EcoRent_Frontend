import { Device } from '../types/Device';
import { client } from '../utils/sendRequest';

export const getAllDevices = async () => {
  return client.get<Device[]>('/api/devices/getAllDevices');
};
