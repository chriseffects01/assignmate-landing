import { IUser } from "./user.types";

export interface AuthResponse {
  token: string;
  user: IUser;
}

export interface LoginPayload {
  email: string;
  username?: string;
  password: string;
  phoneNumber?: string;
}

export interface RegisterPayload {
  firtsname: string;
  lastName: string;
  username: string;
  email: string;
  phoneNumber?: string;
  password: string;
}
