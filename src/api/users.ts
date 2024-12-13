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

export const updateUser = async ({ name, surname, email, phone }: User) => {
  return client.put<User>('/api/auth/updateUser', {
    name,
    surname,
    email,
    phone,
  });
};

export const deleteUser = async () => {
  return client.delete('/api/auth/deleteUser');
};
