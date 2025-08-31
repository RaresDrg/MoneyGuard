export type UserType = {
  _id: string;
  name: string;
  email: string;
  password: string;
  balance: number;
  token: string | null;
  validationToken: { value: string; expiresAt: Date } | null;
};

export type ExchangeRatesType = {
  rates: Record<string, number>;
  expiresAt: Date;
};

export type TransactionType = {
  _id: string;
  owner: string;
  type: "income" | "expense";
  category: string;
  sum: number;
  date: Date;
  comment: string;
};

type TransactionTypeAndSum = Pick<TransactionType, "type" | "sum">;

type AddAction = {
  type: "add";
  addedTransaction: TransactionTypeAndSum;
};

type DeleteAction = {
  type: "delete";
  deletedTransaction: TransactionTypeAndSum;
};

type EditAction = {
  type: "edit";
  oldTransaction: TransactionTypeAndSum;
  updatedTransaction: TransactionTypeAndSum;
};

export type TransactionAction = AddAction | DeleteAction | EditAction;
