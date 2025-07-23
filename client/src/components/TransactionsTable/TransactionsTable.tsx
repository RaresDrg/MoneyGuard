import { TransactionsTableRow } from "..";
import { useTransactions } from "../../hooks";

type Props = {
  className?: string;
};

const TransactionsTable = ({ className: styles }: Props) => {
  const { transactionsList } = useTransactions();

  return (
    <table className={`${styles} animate__animated animate__zoomIn`}>
      <thead>
        <tr>
          <th>Date</th>
          <th>Type</th>
          <th>Category</th>
          <th>Comment</th>
          <th>Sum</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {transactionsList!.map((item) => (
          <TransactionsTableRow key={item._id} transaction={item} />
        ))}
      </tbody>
    </table>
  );
};

export default TransactionsTable;
