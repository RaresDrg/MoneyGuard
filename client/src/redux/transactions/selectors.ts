import type { RootState } from "../../App.types";

const transactionsSelectors = {
  selectTransactionsList: (state: RootState) =>
    state.transactions.transactionsList,
  selectInitialFetchDone: (state: RootState) =>
    state.transactions.initialFetchDone,
  selectCursor: (state: RootState) => state.transactions.cursor,
  selectHasMore: (state: RootState) => state.transactions.hasMore,
  selectTargetedTransaction: (state: RootState) =>
    state.transactions.targetedTransaction,
};

export default transactionsSelectors;
