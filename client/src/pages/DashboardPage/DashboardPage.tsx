import { useReactResponsive, useTransactions, useModals } from "../../hooks";
import { Balance, AddButton, LoadingSpinner } from "../../components/common";
import { TransactionsLayout } from "../../components";

type Props = {
  className?: string;
};

const DashboardPage = ({ className: styles }: Props) => {
  const { isOnMobile } = useReactResponsive();
  const { isLoading } = useTransactions();
  const { openModal } = useModals();

  return (
    <div className={styles}>
      <h2>Transactions</h2>
      {isOnMobile && <Balance />}
      <TransactionsLayout />
      <AddButton handleClick={() => openModal("addModal")} />

      {isLoading && <LoadingSpinner />}
    </div>
  );
};

export default DashboardPage;
