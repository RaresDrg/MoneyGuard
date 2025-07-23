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

export interface InputProps {
  className?: string;
  type: "text" | "password" | "number";
  id: string;
  name: string;
  placeholder: string;
  hasErrors?: boolean;
  values?: string;
  icon?: string;
}

export interface FormButtonProps {
  className?: string;
  type: "button" | "submit";
  variant: "gradient" | "white";
  text: string;
  isDisabled?: boolean;
  handlerFunction?: () => void;
}

export type AppDispatch = typeof import("./redux/store").store.dispatch;

export type RootState = ReturnType<
  typeof import("./redux/store").store.getState
>;

export interface AuthState {
  isLoading: boolean;
  error: null | string;
  isLoggedIn: boolean;
  user: null | User;
}

export interface User {
  name: string;
  email: string;
}

export interface ErrorResponse {
  status?: number;
  response?: { data?: { message?: string } };
}

export interface TransactionsState {
  isLoading: boolean;
  error: null | string;
  balance: number;
  transactionsList: null | Array<Transaction>;
  targetedTransaction: null | Transaction;
  statistics: null | Statistics;
}

export interface Transaction {
  _id: string;
  type: "income" | "expense";
  category: string;
  sum: number;
  date: string;
  comment: string;
}

export interface Statistics {
  income: {
    total: number;
    summary: Record<string, number>;
  };
  expense: {
    total: number;
    summary: Record<string, number>;
  };
  balance: number;
}

export interface TransactionPayloadResponse {
  data: {
    transactionslist: Array<Transaction> | null;
    balance: number;
  };
}
