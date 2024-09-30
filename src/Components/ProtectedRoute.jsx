// ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from 'js-cookie';

const ProtectedRoute = ({ component: Component }) => {
  const token = Cookies.get('token');
  return token ? <Component /> : <Navigate to="/landing" />;
};

export default ProtectedRoute;
