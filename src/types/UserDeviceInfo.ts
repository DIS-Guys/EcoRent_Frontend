import { DeviceImage } from './DeviceImage';

export type UserDeviceInfo = {
  title: string;
  description: string;
  manufacturer: string;
  deviceModel: string;
  condition: string;
  batteryCapacity: number;
  weight: number;
  typeC: number;
  typeA: number;
  sockets: number;
  remoteUse: string;
  dimensions: { length: string; width: string; height: string };
  batteryType: string;
  signalShape: string;
  additional: string;
  images: DeviceImage[];
  price: number;
  minRentTerm: number;
  maxRentTerm: number;
  policyAgreement: boolean;
};
