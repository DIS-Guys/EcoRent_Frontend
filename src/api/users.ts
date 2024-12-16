import { client } from '../utils/sendRequest';
import { User } from '../types/User';
import { LoginResponse } from '../types/LoginResponse';

export const createUser = async ({ name, surname, email, password }: User) => {
  return client.post('/api/auth/register', { name, surname, email, password });
};

export const loginUser = async ({
  email,
  password,
}: Omit<User, 'name' | 'surname'>) => {
  return client.post<LoginResponse>('/api/auth/login', { email, password });
};

export const getUser = async () => {
  return client.get<User>('/api/auth/getUser');
};

export const updateUserProfile = async ({
  name,
  surname,
  email,
  phoneNumber,
}: Omit<User, 'password'>) => {
  return client.put<User>('/api/auth/updateUser', {
    name,
    surname,
    email,
    phoneNumber,
  });
};

export const updateUserAddress = async ({
  region,
  town,
  street,
  houseNumber,
  apartmentNumber,
  floorNumber,
}: Omit<User, 'name' | 'surname' | 'email' | 'password'>) => {
  return client.put<User>('/api/auth/updateUser', {
    region,
    town,
    street,
    houseNumber,
    apartmentNumber,
    floorNumber,
  });
};

export const updatePassword = async ({
  oldPassword,
  newPassword,
}: {
  oldPassword: string;
  newPassword: string;
}) => {
  return client.put('/api/auth/updatePassword', { oldPassword, newPassword });
};

export const deleteUser = async () => {
  return client.delete('/api/auth/deleteUser');
};
