export type AppDispatch = typeof import("./redux/store").store.dispatch;

export type RootState = ReturnType<
  typeof import("./redux/store").store.getState
>;

export type AuthState = {
  isLoading: boolean;
  error: null | string;
  isLoggedIn: boolean;
  user: null | User;
};

export type User = {
  name: string;
  email: string;
  balance: number;
};

export type ErrorResponse = {
  status?: number;
  response?: { data?: { message?: string } };
};

export type TransactionsState = {
  isLoading: boolean;
  error: null | string;
  transactionsList: Array<Transaction>;
  initialFetchDone: boolean;
  cursor: null | string;
  hasMore: boolean;
  targetedTransaction: null | Transaction;
};

export type Transaction = {
  id: string;
  type: "income" | "expense";
  category: string;
  sum: number;
  date: string;
  comment: string;
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

export type Background =
  | "gradientBg_mobile"
  | "gradientBg_mobile_2x"
  | "gradientBg_tablet"
  | "gradientBg_tablet_2x"
  | "gradientBg_desktop"
  | "gradientBg_desktop_2x"
  | "loginBg_tablet"
  | "loginBg_tablet_2x"
  | "loginBg_desktop"
  | "loginBg_desktop_2x"
  | "registerBg_tablet"
  | "registerBg_tablet_2x"
  | "registerBg_desktop"
  | "registerBg_desktop_2x";

export type PaginationParams = {
  sort: "ascending" | "descending";
  limit: number;
  cursor?: string;
};
