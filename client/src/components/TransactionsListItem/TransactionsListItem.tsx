import type { Transaction } from "../../App.types";
import { DeleteButton, EditButton, EllipsisTooltip } from "../common";
import { formatDate, formatAmount } from "../../utils";

type Props = {
  className?: string;
  transaction: Transaction;
};

const TransactionsListItem = ({ className: styles, transaction }: Props) => {
  return (
    <li className={`${styles} animate__animated animate__rotateInUpLeft`}>
      <p>
        <span>Date</span>
        <span>{formatDate(transaction.date)}</span>
      </p>
      <p>
        <span>Type</span>
        <span>{transaction.type === "income" ? "+" : "-"}</span>
      </p>
      <p>
        <span>Category</span>
        <span>{transaction.category}</span>
      </p>
      <p>
        <span>Comment</span>
        <EllipsisTooltip text={transaction.comment} />
      </p>
      <p>
        <span>Sum</span>
        <EllipsisTooltip text={formatAmount(transaction.sum)} />
      </p>
      <p>
        <DeleteButton transaction={transaction} />
        <EditButton transaction={transaction} />
      </p>
    </li>
  );
};

export default TransactionsListItem;
