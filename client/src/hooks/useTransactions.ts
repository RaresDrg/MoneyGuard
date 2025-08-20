import { useSelector } from "react-redux";
import {
  selectIsLoading,
  selectTransactionsList,
  selectTargetedTransaction,
  selectStatistics,
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
    statistics: useSelector(selectStatistics),
  };
};

export default useTransactions;
