import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface Props {
 children: React.ReactNode;
 roles?: string[];
}

export const ProtectedRoute = ({ children, roles }: Props) => {
 const { user, isAuthenticated } = useAuth();
 const location = useLocation();

 if (!isAuthenticated) {
   return <Navigate to="/login" state={{ from: location }} replace />;
 }

 if (roles && !roles.includes(user?.role || '')) {
   return <Navigate to="/unauthorized" replace />;
 }

 return <>{children}</>;
};