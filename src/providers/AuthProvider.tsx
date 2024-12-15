import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../contexts/AuthContext';
import { createUser, loginUser } from '../api/users';

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
        toast.error(error.message, {
          position: 'bottom-right',
        });
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

  const logout = () => {
    localStorage.removeItem('jwt');
    setAuthorized(false);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ authorized, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
