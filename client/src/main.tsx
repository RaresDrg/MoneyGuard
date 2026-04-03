import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import { ResponsiveProvider } from "./contexts";
import App from "./App.tsx";
import "./index.css";

const root = createRoot(document.getElementById("root")!);
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ResponsiveProvider>
        <App />
      </ResponsiveProvider>
    </PersistGate>
  </Provider>,
);
