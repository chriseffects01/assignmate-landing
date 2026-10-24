type accountTypes = 'student' | 'business';
type subscriptionType = 'free' | 'premium';
type roleType = 'user' | 'admin';

export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  middleName?: string;
  displayName?: string;
  email: string;
  role?: roleType;
  subscription?: subscriptionType;
  verified?: boolean;
  phoneNumber?: string;
  accountType?: accountTypes;
  businessName?: string;
  businessPhone?: string;
  department?: string;
  registrationNumber?: string;
  profileCompleted?: boolean;
  faculty?: string;
  level?: string;
  createdAt?: any;
}
