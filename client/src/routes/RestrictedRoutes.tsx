import { Route, Navigate, Outlet } from "react-router-dom";
import { useReduxState } from "../hooks";
import { HomePage, LoginPage, RegisterPage, ResetPasswordPage } from "../pages";

function RestrictedRoutesGuard() {
  const isLoggedIn = useReduxState("selectIsLoggedIn");
  return isLoggedIn ? <Navigate to="/dashboard" /> : <Outlet />;
}

const RestrictedRoutes = (
  <Route element={<RestrictedRoutesGuard />}>
    <Route path="/" element={<HomePage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/reset-password" element={<ResetPasswordPage />} />
  </Route>
);

export default RestrictedRoutes;
