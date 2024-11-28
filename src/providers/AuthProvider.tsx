import { useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';

type Props = {
  children: React.ReactNode;
};

const BASE_URL = 'http://localhost:3000';

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      setAuthorized(true);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const response = await fetch(BASE_URL + '/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) throw new Error('Invalid email or password!');

    const { token } = await response.json();

    localStorage.setItem('jwt', token);
    setAuthorized(true);
  };

  const register = async (
    name: string,
    surname: string,
    email: string,
    password: string
  ) => {
    const response = await fetch(BASE_URL + '/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, surname, email, password }),
    });

    if (!response.ok) throw new Error('Registration failed!');

    await login(email, password);
  };

  return (
    <AuthContext.Provider value={{ authorized, login, register }}>
      {children}
    </AuthContext.Provider>
  );
};
