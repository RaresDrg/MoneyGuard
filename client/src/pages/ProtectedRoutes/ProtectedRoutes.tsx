import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks";

const ProtectedRoutes = () => {
  const { isLoggedIn } = useAuth();

  return !isLoggedIn ? <Navigate to="/" /> : <Outlet />;
};

export default ProtectedRoutes;
