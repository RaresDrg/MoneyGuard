import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";
import { reducer as generalReducer } from "./general/slice";
import { reducer as authReducer } from "./auth/slice";
import { reducer as transactionsReducer } from "./transactions/slice";

const persistedAuthReducer = persistReducer(
  { key: "auth", storage: storageSession, whitelist: ["isLoggedIn", "user"] },
  authReducer
);

const store = configureStore({
  reducer: {
    general: generalReducer,
    auth: persistedAuthReducer,
    transactions: transactionsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/REGISTER",
        ],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };
