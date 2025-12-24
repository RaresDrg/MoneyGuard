import { useReactResponsive, useModal, useTransactions } from "../../hooks";
import { renderIcon } from "../../utils";
import { TransactionsList, TransactionsTable } from "../../components";
import { Balance } from "../../components/common";

type Props = {
  className?: string;
};

const DashboardPage = ({ className }: Props) => {
  const { isOnMobile } = useReactResponsive();
  const { openModal } = useModal();
  const { transactionsList, isLoading, observerRef } = useTransactions();
  const hasTransactions = transactionsList.length > 0;

  return (
    <div className={className}>
      <h2 className="page-title">Transactions</h2>
      {isOnMobile && <Balance />}

      {!hasTransactions && !isLoading && (
        <p className="fallback">
          Your transaction list is empty. Use the <b>Add button</b> below to
          start tracking your activity.
        </p>
      )}

      {hasTransactions && isOnMobile && (
        <TransactionsList
          transactions={transactionsList}
          observerRef={observerRef}
        />
      )}
      {hasTransactions && !isOnMobile && (
        <TransactionsTable
          transactions={transactionsList}
          observerRef={observerRef}
        />
      )}

      {isLoading && <span className="text-loader">Loading...</span>}

      <button
        type="button"
        className="add-btn"
        onClick={() => openModal("addTransactionModal")}
      >
        {renderIcon("icon-plus")}
      </button>
    </div>
  );
};

export default DashboardPage;
