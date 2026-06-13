import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ 
  children, 
  allowedRoles 
}: { 
  children: React.ReactNode, 
  allowedRoles?: string[] 
}) {
  const { user, dbUser, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-[#f4f7f9] text-black">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && dbUser && !allowedRoles.includes(dbUser.role)) {
    // If user tries to access a route they aren't allowed to, redirect them to their respective dashboard
    if (dbUser.role === 'admin') {
      return <Navigate to="/admin" replace />;
    } else if (dbUser.role === 'instructor') {
      return <Navigate to="/instructor" replace />;
    } else {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return <>{children}</>;
}
