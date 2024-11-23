import React, { useState } from 'react';

type Props = {
  children: React.ReactNode;
};

export const AuthContext = React.createContext({
  authorized: false,
  login: (email: string, password: string) => {},
});

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [authorized, setAuthorized] = useState(false);

  const login = (email: string, password: string) => {
    if (email && password) {
      setAuthorized(true);
    }
  };

  return (
    <AuthContext.Provider value={{ authorized, login }}>
      {children}
    </AuthContext.Provider>
  );
};
