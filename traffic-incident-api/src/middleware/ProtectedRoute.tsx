// src/middleware/ProtectedRoute.tsx
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = ({ children, roles }) => {
  const { user } = useAuth();
  const location = useLocation();

  // Agregar console.log para debuggear
  console.log('ProtectedRoute - User:', user);
  console.log('ProtectedRoute - Required roles:', roles);

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (roles && !roles.includes(user.role)) {
    console.log('ProtectedRoute - Unauthorized role');
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};