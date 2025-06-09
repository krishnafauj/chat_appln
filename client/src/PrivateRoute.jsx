// src/PrivateRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const isAuthenticated = !!localStorage.getItem('token'); // or your auth logic

  return isAuthenticated ? <Outlet /> : <Navigate to="/Login" />;
};

export default PrivateRoute;
