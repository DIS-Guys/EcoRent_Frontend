import { useContext } from 'react';
import './RequireAuth.css';
import { AuthContext } from '../../contexts/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

export const RequireAuth: React.FC = () => {
  const { authorized } = useContext(AuthContext);

  if (!authorized) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};
