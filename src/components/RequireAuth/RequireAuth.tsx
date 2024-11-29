import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export const RequireAuth: React.FC = () => {
  const { authorized } = useContext(AuthContext);
  const { pathname } = useLocation();

  if (!authorized) {
    return <Navigate to="/login" state={{ pathname }} replace />;
  }

  return <Outlet />;
};
