import { api } from './api';

import type {
  UpdateProfileData,
  UpdateProfileResponse,
} from '../types/profile';
import { normalizeApiError } from './api';

export async function UpdateProfile(data: UpdateProfileData) {
  try {
    const res = await api.patch<UpdateProfileResponse>(
      '/api/auth/profile',
      data
    );
    return res.data;
  } catch (e: any) {
    normalizeApiError(e);
  }
}
