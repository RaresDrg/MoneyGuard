import { useSelector } from "react-redux";
import {
  selectIsLoading,
  selectBalance,
  selectTransactionsList,
  selectTargetedTransaction,
  selectStatistics,
} from "../redux/transactions/selectors";

const useTransactions = () => {
  return {
    isLoading: useSelector(selectIsLoading),
    balance: useSelector(selectBalance),
    transactionsList: useSelector(selectTransactionsList),
    targetedTransaction: useSelector(selectTargetedTransaction),
    statistics: useSelector(selectStatistics),
  };
};

export default useTransactions;
