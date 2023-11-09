import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, requiredRole }) => {
  const isAuthenticated = !!localStorage.getItem('jwt');
  console.log(isAuthenticated);
  const userRole = localStorage.getItem('role'); 
  console.log(userRole);


  if (!isAuthenticated) {
    return <Navigate to="/" />; 
  } else if (userRole === requiredRole) {
    return element; 
  } else {
    return <Navigate to="/NotFound" />; 
  }
};

export default ProtectedRoute;