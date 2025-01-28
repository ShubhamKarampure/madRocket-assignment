// src/components/ProtectedRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from 'src/context/authContext';

interface ProtectedRouteProps {
  element: React.ReactNode; 
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
    const { user } = useAuth(); 
    
  if (!user) {
    return <Navigate to="/sign-in" />; 
  }

  return <>{element}</>; 
};

export default ProtectedRoute;
