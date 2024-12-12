import React from 'react';

export interface AuthContextProps {
  authorized: boolean;
  login: (email: string, password: string) => void;
  register: (
    name: string,
    surname: string,
    email: string,
    password: string
  ) => void;
  logout: () => void;
}

export const AuthContext = React.createContext<AuthContextProps | null>(null);
