import { store } from "./redux/store";

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export type LoadingType = "screen" | "spinner";

export type ModalType =
  | "addTransactionModal"
  | "deleteTransactionModal"
  | "editTransactionModal"
  | "logoutModal";

export type GeneralState = {
  activeLoader: LoadingType | null;
  activeModal: ModalType | null;
};

export type User = {
  name: string;
  email: string;
  balance: number;
};

export type AuthState = {
  isLoggedIn: boolean;
  user: User | null;
};

export type Transaction = {
  id: string;
  type: "income" | "expense";
  category: string;
  sum: number;
  date: string;
  comment: string;
};

export type TransactionsState = {
  transactionsList: Array<Transaction>;
  initialFetchDone: boolean;
  cursor: null | Transaction["id"];
  hasMore: boolean;
  targetedTransaction: null | Transaction;
};

export type Statistics = {
  income: {
    total: number;
    summary: Record<string, number>;
  };
  expense: {
    total: number;
    summary: Record<string, number>;
  };
  balance: number;
};

export type ErrorResponse = {
  status?: number;
  response?: { data?: { message?: string } };
};
