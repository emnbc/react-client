import { Navigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";

export const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
  // const location = useLocation();
  const auth = useAuth();
  console.log("ProtectedRoute");

  return auth.isLoggedIn ? element : <Navigate to="/login" />;
};
