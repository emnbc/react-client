import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";

export const Protected = ({ element }: { element: JSX.Element }) => {
  const location = useLocation();
  const auth = useAuth();

  return auth.isLoggedIn ? (
    element
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
