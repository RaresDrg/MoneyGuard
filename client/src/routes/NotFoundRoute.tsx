import { Route } from "react-router-dom";
import { NotFoundPage } from "../pages";

const NotFoundRoute = <Route path="*" element={<NotFoundPage />} />;

export default NotFoundRoute;
