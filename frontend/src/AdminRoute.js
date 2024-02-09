import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

const AdminRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user || user.role !== 'admin') {
    // If not logged in as admin, redirect to the home page
    return <Navigate to='/' replace />;
  }

  // If the user is an admin, render the child components (the protected route's content)
  return children;
};

export default AdminRoute;
