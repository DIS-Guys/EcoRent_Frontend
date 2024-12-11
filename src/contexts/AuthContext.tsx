import React from 'react';

interface AuthContextProps {
  authorized: boolean;
  setAuthorized: (authorized: boolean) => void;
}

export const AuthContext = React.createContext<AuthContextProps | null>(null);
