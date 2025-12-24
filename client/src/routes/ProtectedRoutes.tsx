import { Route, Navigate, Outlet } from "react-router-dom";
import { useReduxState } from "../hooks";
import { SharedLayout } from "../components";
import { CurrencyPage, DashboardPage, StatisticsPage } from "../pages";

const ProtectedRoutesGuard = () => {
  const isLoggedIn = useReduxState("selectIsLoggedIn");
  return !isLoggedIn ? <Navigate to="/login" /> : <Outlet />;
};

const ProtectedRoutes = (
  <Route element={<ProtectedRoutesGuard />}>
    <Route path="/dashboard" element={<SharedLayout />}>
      <Route index element={<DashboardPage />} />
      <Route path="statistics" element={<StatisticsPage />} />
      <Route path="currency" element={<CurrencyPage />} />
    </Route>
  </Route>
);

export default ProtectedRoutes;
