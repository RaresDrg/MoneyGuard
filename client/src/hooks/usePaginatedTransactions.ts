import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useAppDispatch, useTransactions } from ".";
import { getTransactions } from "../redux/transactions/operations";
import { notify } from "../utils";
import { PAGE_SIZE } from "../constants";

const usePaginatedTransactions = () => {
  const { transactionsList, cursor, hasMore, initialFetchDone } =
    useTransactions();

  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const { ref: observerRef, inView } = useInView({ triggerOnce: true });

  function fetchTransactions() {
    if (!isLoading && hasMore) {
      const paginationParams = cursor
        ? { sort: "descending" as const, limit: PAGE_SIZE, cursor }
        : { sort: "descending" as const, limit: PAGE_SIZE };

      setIsLoading(true);
      dispatch(getTransactions(paginationParams))
        .unwrap()
        .catch((error) => {
          if (error?.status !== 401) {
            notify.warning(
              "Something went wrong while loading your transactions. Please refresh the page or come back later"
            );
          }
        })
        .finally(() => setIsLoading(false));
    }
  }

  useEffect(() => {
    if (!initialFetchDone || inView) fetchTransactions();
  }, [inView, initialFetchDone]);

  return { transactionsList, observerRef, isLoading };
};

export default usePaginatedTransactions;
