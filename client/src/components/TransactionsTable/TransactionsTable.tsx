import { TransactionsTableRow } from "..";
import type { Transaction } from "../../App.types";

type Props = {
  className?: string;
  transactions: Transaction[];
  observerRef: (node: HTMLElement | null) => void;
};

const TransactionsTable = ({ className, transactions, observerRef }: Props) => {
  const styles = `${className} animate__animated animate__zoomIn`;

  return (
    <table className={styles}>
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
        {transactions.map((item, index) => (
          <TransactionsTableRow
            key={item.id}
            transaction={item}
            observerRef={index === transactions.length - 1 ? observerRef : null}
          />
        ))}
      </tbody>
    </table>
  );
};

export default TransactionsTable;
