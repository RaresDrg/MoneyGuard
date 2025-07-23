import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuth } from "./hooks";
import { Notification, LoadingScreen } from "./components/common";
import { SharedLayout } from "./components";
import {
  RestrictedRoutes,
  ProtectedRoutes,
  LoginPage,
  RegisterPage,
  ResetPasswordPage,
  NotFoundPage,
  DashboardPage,
  StatisticsPage,
  CurrencyPage,
} from "./pages";

// todo lazy

const App = () => {
  const { isLoading } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RestrictedRoutes />}>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
        </Route>

        <Route element={<ProtectedRoutes />}>
          <Route path="/dashboard" element={<SharedLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="statistics" element={<StatisticsPage />} />
            <Route path="currency" element={<CurrencyPage />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {isLoading && <LoadingScreen />}
      <Notification />
    </BrowserRouter>
  );
};
export default App;
