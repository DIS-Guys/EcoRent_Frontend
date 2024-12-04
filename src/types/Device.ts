export type Device = {
  _id: string;
  manufacturer: string;
  deviceModel: string;
  state: string;
  batteryCapacity: number;
  weight: number;
  typeC: number;
  typeA: number;
  sockets: number;
  remoteUse: string;
  sizeXYZ: number[];
  batteryType: string;
  outputSignalForm: string;
  additional: string;
  deviceImages: string[];
};
