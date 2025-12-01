import { Navigate } from "react-router-dom";


const ProtectedRoute = ({ children }) => {

  const isAdmin = false; 
  return isAdmin ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
