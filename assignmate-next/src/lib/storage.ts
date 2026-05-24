import { KEY, TOKEN_KEY, USER_KEY } from "../var/var";

export const storage = {
  getToken: () => localStorage.getItem(TOKEN_KEY),
  setToken: (token: string) => {
    localStorage.setItem(TOKEN_KEY, token);
  },

  removeToken: () => localStorage.removeItem(TOKEN_KEY),

  getUser: () => {
    const user = localStorage.getItem(USER_KEY);

    return user ? JSON.parse(user) : null;
  },

  setUser: (user: unknown) => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  removeUser: () => {
    localStorage.removeItem(USER_KEY);
  },

  clearAuth: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(KEY);
  },
};
