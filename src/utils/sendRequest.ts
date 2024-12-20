/* eslint-disable @typescript-eslint/no-explicit-any */
const BASE_URL = 'https://eco-rent-backend.vercel.app';

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

async function sendRequest<T>(
  url: string,
  method: RequestMethod = 'GET',
  data?: any
): Promise<T> {
  const token = localStorage.getItem('jwt');
  const headers: HeadersInit = {};

  if (data && !(data instanceof FormData)) {
    headers['Content-Type'] = 'application/json; charset=UTF-8';
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const options: RequestInit = {
    method,
    headers,
    body:
      data instanceof FormData ? data : data ? JSON.stringify(data) : undefined,
  };

  const response = await fetch(BASE_URL + url, options);

  if (token && response.status === 403) {
    localStorage.removeItem('jwt');
    window.location.href = '/login';
    throw new Error('Unauthorized');
  }

  if (!response.ok) {
    const errorResponse: Error = await response.json();
    throw new Error(errorResponse.message);
  }

  return await response.json();
}

export const client = {
  get: async <T>(url: string) => sendRequest<T>(url, 'GET'),
  post: async <T>(url: string, data: any) => sendRequest<T>(url, 'POST', data),
  put: async <T>(url: string, data: any) => sendRequest<T>(url, 'PUT', data),
  delete: async <T>(url: string) => sendRequest<T>(url, 'DELETE'),
};
