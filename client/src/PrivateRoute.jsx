// ./auth/PrivateRoute.jsx
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('authToken'); // Get token from localStorage

  return token ? children : <Navigate to="/login" />; // Redirect if not logged in
};

export default PrivateRoute;
