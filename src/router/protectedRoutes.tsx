import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  // Retrieve the JWT token from localStorage
  const authenticatedEmail = localStorage.getItem("email");

  // Allow access only if the token exists
  return authenticatedEmail ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
