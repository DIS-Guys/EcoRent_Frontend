import { ErrorResponse } from '../types/ErrorResponse';

/* eslint-disable @typescript-eslint/no-explicit-any */
const BASE_URL = 'http://localhost:3000';

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

type AuthData = {
  token: string;
  navigate: (path: string) => void;
};

async function sendRequest<T>(
  url: string,
  method: RequestMethod = 'GET',
  authData?: AuthData,
  data?: any
): Promise<T> {
  const headers: HeadersInit = {};

  if (data && !(data instanceof FormData)) {
    headers['Content-Type'] = 'application/json; charset=UTF-8';
  }

  if (authData?.token) {
    headers['Authorization'] = `Bearer ${authData.token}`;
  }

  const options: RequestInit = {
    method,
    headers,
    body:
      data instanceof FormData ? data : data ? JSON.stringify(data) : undefined,
  };

  const response = await fetch(BASE_URL + url, options);

  if (authData && response.status === 401) {
    localStorage.removeItem('jwt');
    authData.navigate('/login');
    throw new Error('Unauthorized');
  }

  if (!response.ok) {
    const errorResponse: ErrorResponse = await response.json();
    throw new Error(errorResponse.message);
  }

  return await response.json();
}

export const client = {
  get: async <T>(url: string, authData?: AuthData) =>
    sendRequest<T>(url, 'GET', authData),
  post: async <T>(url: string, data: any, authData?: AuthData) =>
    sendRequest<T>(url, 'POST', authData, data),
  put: async <T>(url: string, data: any, authData?: AuthData) =>
    sendRequest<T>(url, 'PUT', authData, data),
  delete: async <T>(url: string, authData?: AuthData) =>
    sendRequest<T>(url, 'DELETE', authData),
};
