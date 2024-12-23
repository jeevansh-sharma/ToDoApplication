import React, { JSX } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './authContext'; // Assuming you have an auth context

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { token } = useAuth(); // Check authentication state

  if (!token) {
    return <Navigate to="/login" replace />; // Redirect if not authenticated
  }

  return children; // Render the protected component if authenticated
};

export default ProtectedRoute;
