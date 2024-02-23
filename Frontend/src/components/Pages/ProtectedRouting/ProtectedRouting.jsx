import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const ProtectedRouting = () => {
  const auth = localStorage.getItem("Token");
  return auth ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRouting;


