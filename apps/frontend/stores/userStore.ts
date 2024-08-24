import { create } from 'zustand';
import { decodeToken } from '../utils/jwt';

interface UserState {
  token: string | null;
  user: { username: string; role: string } | null;
  setToken: (token: string) => void;
  setUser: (user: { username: string; role: string }) => void;
  logout: () => void;
}

const getInitialState = () => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('access_token');
    const user = token
      ? decodeToken<{ username: string; role: string }>(token)
      : null;
    return {
      token: token || null,
      user: user || null,
    };
  }
  return {
    token: null,
    user: null,
  };
};

export const useUserStore = create<UserState>((set) => ({
  ...getInitialState(),
  setToken: (token: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('access_token', token);
    }
    set({
      token,
      user: decodeToken<{ username: string; role: string }>(token),
    });
  },
  setUser: (user) => set({ user }),
  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
    }
    set({ token: null, user: null });
  },
}));
