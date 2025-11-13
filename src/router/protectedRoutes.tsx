import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  // Retrieve the JWT token from localStorage
  const token = localStorage.getItem("authToken");

  // Allow access only if the token exists
  return token ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
