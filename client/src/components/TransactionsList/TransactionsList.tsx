import { TransactionsListItem } from "..";
import type { Transaction } from "../../App.types";

type Props = {
  className?: string;
  transactions: Transaction[];
  observerRef: (node: HTMLElement | null) => void;
};

const TransactionsList = (props: Props) => {
  const { className: styles, transactions, observerRef } = props;

  return (
    <ul className={styles}>
      {transactions.map((item, index) => (
        <TransactionsListItem
          key={item.id}
          transaction={item}
          observerRef={index === transactions.length - 1 ? observerRef : null}
        />
      ))}
    </ul>
  );
};

export default TransactionsList;
