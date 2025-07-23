import { useReactResponsive, useTransactions } from "../../hooks";
import { Balance, AddButton } from "../../components/common";
import { TransactionsList, TransactionsTable } from "../../components";

type Props = {
  className?: string;
};

const DashboardPage = ({ className: styles }: Props) => {
  const { isOnMobile } = useReactResponsive();
  const { transactionsList } = useTransactions();

  return (
    <div className={styles}>
      <h2>Transactions</h2>

      {isOnMobile && <Balance />}

      {!transactionsList ? (
        <p className="animate__animated animate__fadeInUp">
          Your transaction list is empty. Use the <b>Add button</b> below to
          start tracking your activity.
        </p>
      ) : isOnMobile ? (
        <TransactionsList />
      ) : (
        <TransactionsTable />
      )}

      <AddButton />
    </div>
  );
};

export default DashboardPage;
