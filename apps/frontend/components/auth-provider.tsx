'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useUserStore } from '../stores/userStore';

interface AuthContextProps {
  token: string | null;
  setToken: (token: string) => void;
  user: { username: string; role: string } | null;
  setUser: (user: { username: string; role: string }) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { token, user, setToken, setUser, logout } = useUserStore();

  return (
    <AuthContext.Provider value={{ token, setToken, user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
