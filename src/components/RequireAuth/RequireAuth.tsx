import { useContext } from 'react';
import { AuthContext, AuthContextProps } from '../../contexts/AuthContext';
import { Navigate, Outlet, useLocation } from 'react-router';

export const RequireAuth: React.FC = () => {
  const { authorized } = useContext(AuthContext) as AuthContextProps;
  const { pathname } = useLocation();

  if (authorized === null) {
    return <div>Loading...</div>;
  }

  if (!authorized) {
    return <Navigate to="/login" state={{ pathname }} replace />;
  }

  return <Outlet />;
};
