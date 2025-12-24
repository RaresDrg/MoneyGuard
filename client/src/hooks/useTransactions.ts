import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useReduxState, useAppDispatch } from ".";
import { transactionsService } from "../services/";
import { handleRequestFlow, notify } from "../utils";
import {
  setTransactionsList,
  setInitialFetchDone,
  setCursor,
  setNoMoreTransactions,
} from "../redux/transactions/actions";

const useTransactions = () => {
  const transactionsList = useReduxState("selectTransactionsList");
  const initialFetchDone = useReduxState("selectInitialFetchDone");
  const cursor = useReduxState("selectCursor");
  const hasMore = useReduxState("selectHasMore");

  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const { ref: observerRef, inView } = useInView({ triggerOnce: true });

  const PAGE_SIZE = 10;

  function fetchTransactions() {
    if (!isLoading && hasMore) {
      setIsLoading(true);
      handleRequestFlow({
        request: () =>
          transactionsService.getTransactions({
            sort: "descending",
            limit: PAGE_SIZE,
            ...(cursor ? { cursor } : {}),
          }),
        delay: 1000,
        onSuccess: (res) => {
          const newTransactions = res.data.transactions;
          const { length } = newTransactions;
          if (length > 0) dispatch(setTransactionsList(newTransactions));
          if (length < PAGE_SIZE) dispatch(setNoMoreTransactions());
          if (length === PAGE_SIZE)
            dispatch(setCursor(newTransactions.at(-1).id));
        },
        onError: (error) => {
          if (error.status !== 401) {
            const msg = `Something went wrong while loading your transactions. Please refresh the page or come back later`;
            notify.warning(msg);
          }
        },
        onFinally: () => {
          if (!initialFetchDone) dispatch(setInitialFetchDone());
          setIsLoading(false);
        },
      });
    }
  }

  useEffect(() => {
    if (!initialFetchDone || inView) fetchTransactions();
  }, [inView, initialFetchDone]);

  return {
    transactionsList,
    isLoading,
    observerRef: hasMore ? observerRef : null,
  };
};

export default useTransactions;
