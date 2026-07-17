import { KEY, USER_KEY } from '../var/var';
import { IUser } from '../types/user.types';

export const storage = {
  getUser: () => {
    const user = localStorage.getItem(USER_KEY);

    return user ? JSON.parse(user) : null;
  },

  setUser: (user: IUser) => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  removeUser: () => {
    localStorage.removeItem(USER_KEY);
  },

  clearAuth: () => {
    localStorage.removeItem(KEY);
  },
};
