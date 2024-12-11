import { useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { createUser, loginUser } from '../api/users';
import { useLocation, useNavigate } from 'react-router-dom';

type Props = {
  children: React.ReactNode;
};

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [authorized, setAuthorized] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      setAuthorized(true);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { token } = await loginUser({ email, password });
      localStorage.setItem('jwt', token);
      setAuthorized(true);
      navigate(state?.pathname || '/', { replace: true });
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        console.error('Unknown error:', error);
      }
    }
  };

  const register = async (
    name: string,
    surname: string,
    email: string,
    password: string
  ) => {
    await createUser({ name, surname, email, password });
    await login(email, password);
  };

  return (
    <AuthContext.Provider value={{ authorized, login, register }}>
      {children}
    </AuthContext.Provider>
  );
};
