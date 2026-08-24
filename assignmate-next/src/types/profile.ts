import { IUser } from './user.types';

export interface UpdateProfileData {
  firstName: string;
  middleName?: string;
  lastName: string;

  //
  accountType: 'student' | 'business';

  //Student
  level?: string;
  department?: string;
  faculty?: string;
  registrationNumber?: string;

  //Business
  businessName?: string;
  businessPhone?: string;
}

export interface UpdateProfileResponse {
  message: string;
  profileCompleted: boolean;
  user: IUser;
}
