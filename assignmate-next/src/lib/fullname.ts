import { useAuth } from '../context/AuthContext';

export function getUserFullname(): string {
  const { user } = useAuth();
  return `${user?.lastName || ''} ${user?.middleName || ''} ${user?.firstName || ''}`;
}
