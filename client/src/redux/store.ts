import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import { authReducer } from "./auth/slice";
import { modalsReducer } from "./modals/slice";
import { transactionsReducer } from "./transactions/slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    modals: modalsReducer,
    transactions: transactionsReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
