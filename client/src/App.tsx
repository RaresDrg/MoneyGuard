import { BrowserRouter, Routes } from "react-router-dom";
import { RestrictedRoutes, ProtectedRoutes, NotFoundRoute } from "./routes";
import { GlobalUI } from "./components";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {RestrictedRoutes}
        {ProtectedRoutes}
        {NotFoundRoute}
      </Routes>

      <GlobalUI />
    </BrowserRouter>
  );
};
export default App;
