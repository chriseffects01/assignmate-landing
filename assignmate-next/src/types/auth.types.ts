import { IUser } from './user.types';

export interface AuthResponse {
  user: IUser;
}

export interface LoginPayload {
  email: string;
  username?: string;
  password: string;
  phoneNumber?: string;
}

export interface RegisterPayload {
  username: string;
  email: string;
  phoneNumber?: string;
  password: string;
}
