import axios from 'axios';
import {
  OfflineError,
  UnathourizedError,
  UnknownServerError,
} from '../errors/appError';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
api.interceptors.request.use(
  config => {
    return config;
  },

  error => {
    return Promise.reject(error);
  }
);
export function normalizeApiError(error: unknown): Error {
  if (axios.isAxiosError(error)) {
    if (error.message === 'Network Error') {
      throw new OfflineError();
    }

    if (error.response?.status === 401) {
      throw new UnathourizedError();
    }
  }

  throw new UnknownServerError();
}
