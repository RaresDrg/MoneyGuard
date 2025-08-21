import { usePaginatedTransactions, useReactResponsive } from "../../hooks";
import { TransactionsList, TransactionsTable } from "../../components";
import { TextLoader } from "../common";

const TransactionsLayout = () => {
  const { isOnMobile } = useReactResponsive();
  const { transactionsList, observerRef, isLoading } =
    usePaginatedTransactions();

  const hasTransactions = transactionsList.length > 0;
  const showFallback = !hasTransactions && !isLoading;
  const showList = hasTransactions && isOnMobile;
  const showTable = hasTransactions && !isOnMobile;

  return (
    <>
      {showFallback && (
        <p className="fallback animate__animated animate__fadeIn">
          Your transaction list is empty. Use the <b>Add button</b> below to
          start tracking your activity.
        </p>
      )}

      {showList && (
        <TransactionsList
          transactions={transactionsList}
          observerRef={observerRef}
        />
      )}

      {showTable && (
        <TransactionsTable
          transactions={transactionsList}
          observerRef={observerRef}
        />
      )}

      {isLoading && <TextLoader text="Loading..." />}
    </>
  );
};

export default TransactionsLayout;
