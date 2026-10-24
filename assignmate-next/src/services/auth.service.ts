import { api, normalizeApiError } from '@/src/services/api';
import {
  LoginPayload,
  RegisterPayload,
  AuthResponse,
  CheckUsernameResponse,
} from '@/src/types/auth.types';

export const authService = {
  async login(data: LoginPayload) {
    try {
      const response = await api.post<AuthResponse>('/api/auth/login', data);

      return response.data;
    } catch (e: any) {
      throw normalizeApiError(e);
    }
  },

  async register(data: RegisterPayload) {
    try {
      const response = await api.post<AuthResponse>('api/auth/register', data);

      return response.data;
    } catch (e: any) {
      throw normalizeApiError(e);
    }
  },

  async me() {
    try {
      const response = await api.get<AuthResponse>('/api/auth/me');

      return response.data;
    } catch (e: any) {
      throw normalizeApiError(e);
    }
  },

  async logout() {
    try {
      const response = await api.post<{ message: string }>('/api/auth/logout');

      return response.data;
    } catch (e: any) {
      throw normalizeApiError(e);
    }
  },

  async deleteAccount() {
    try {
      const response = await api.delete<{ message: string }>(
        'api/auth/account'
      );
      return response.data;
    } catch (e: any) {
      throw normalizeApiError(e);
    }
  },

  async checkUsername(username: string): Promise<CheckUsernameResponse> {
    try {
      const response = await api.get<CheckUsernameResponse>(
        `/api/auth/check-username?username=${encodeURIComponent(username)}`
      );
      return response.data;
    } catch (e: any) {
      throw normalizeApiError(e);
    }
  },
};
