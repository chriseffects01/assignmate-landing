import { api } from "@/src/services/api";
import {
  LoginPayload,
  RegisterPayload,
  AuthResponse,
} from "@/src/types/auth.types";

export const authService = {
  async login(data: LoginPayload) {
    const response = await api.post<AuthResponse>("/api/auth/login", data);

    return response.data;
  },

  async register(data: RegisterPayload) {
    const response = await api.post<AuthResponse>("api/auth/register", data);

    return response.data;
  },
};
