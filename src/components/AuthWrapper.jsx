import React from 'react';
import { Navigate } from 'react-router-dom';

export default function AuthWrapper({ children }) {
  const isAuthenticated = localStorage.getItem('token'); // Replace with real auth logic

  if (!isAuthenticated) {
    return <Navigate to="/" replace />; // Or show modal or message
  }

  return <>{children}</>;
}
