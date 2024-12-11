import React from 'react';

export interface AuthContextProps {
  authorized: boolean;
  setAuthorized: (authorized: boolean) => void;
}

export const AuthContext = React.createContext<AuthContextProps | null>(null);
