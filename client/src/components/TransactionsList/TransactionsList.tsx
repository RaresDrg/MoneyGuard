import { TransactionsListItem } from "..";
import { useTransactions } from "../../hooks";

type Props = {
  className?: string;
};

const TransactionsList = ({ className: styles }: Props) => {
  const { transactionsList } = useTransactions();

  return (
    <ul className={styles}>
      {transactionsList!.map((item) => (
        <TransactionsListItem key={item._id} transaction={item} />
      ))}
    </ul>
  );
};

export default TransactionsList;
