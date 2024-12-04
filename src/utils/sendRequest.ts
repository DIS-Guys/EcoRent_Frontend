import { ErrorResponse } from '../types/ErrorResponse';

/* eslint-disable @typescript-eslint/no-explicit-any */
const BASE_URL = 'http://localhost:3000';

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

async function sendRequest<T>(
  url: string,
  method: RequestMethod = 'GET',
  data: any = null
): Promise<T> {
  const options: RequestInit = { method };

  if (data) {
    options.body = JSON.stringify(data);
    options.headers = {
      'Content-Type': 'application/json; charset=UTF-8',
    };
  }

  const response = await fetch(BASE_URL + url, options);
  if (!response.ok) {
    const errorResponse: ErrorResponse = await response.json();
    throw new Error(errorResponse.message);
  }

  return await response.json();
}

export const client = {
  get: async <T>(url: string) => sendRequest<T>(url),
  post: async <T>(url: string, data: any) => sendRequest<T>(url, 'POST', data),
  patch: async <T>(url: string, data: any) => sendRequest<T>(url, 'PUT', data),
  delete: async (url: string) => sendRequest(url, 'DELETE'),
};
