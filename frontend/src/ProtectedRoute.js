import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

const ProtectedRoute = ({ children, roles }) => {
  const { currentUser } = useAuth();
  const location = useLocation();

  if (!currentUser) {
    // Not logged in, redirect to login page
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  if (roles && !roles.includes(currentUser.role)) {
    // Logged in but does not have the right role, redirect to login or unauthorized
    return <Navigate to='/unauthorized' state={{ from: location }} replace />;
  }

  // Authorized so return the child component
  return children;
};

export default ProtectedRoute;
