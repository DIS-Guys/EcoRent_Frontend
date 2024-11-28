import { useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';

type Props = {
  children: React.ReactNode;
};

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [authorized, setAuthorized] = useState(false);

  const login = (email: string, password: string) => {
    if (email && password) {
      setAuthorized(true);
      return true;
    }

    return false;
  };

  return (
    <AuthContext.Provider value={{ authorized, login }}>
      {children}
    </AuthContext.Provider>
  );
};
