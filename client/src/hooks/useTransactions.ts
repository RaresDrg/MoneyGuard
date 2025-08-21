import { useSelector } from "react-redux";
import {
  selectIsLoading,
  selectTransactionsList,
  selectTargetedTransaction,
  selectInitialFetchDone,
  selectHasMore,
  selectCursor,
} from "../redux/transactions/selectors";

const useTransactions = () => {
  return {
    isLoading: useSelector(selectIsLoading),
    transactionsList: useSelector(selectTransactionsList),
    initialFetchDone: useSelector(selectInitialFetchDone),
    cursor: useSelector(selectCursor),
    hasMore: useSelector(selectHasMore),
    targetedTransaction: useSelector(selectTargetedTransaction),
  };
};

export default useTransactions;
