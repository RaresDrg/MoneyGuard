import type { Transaction } from "../../App.types";
import { DeleteButton, EditButton, EllipsisTooltip } from "../common";
import { formatDate, formatAmount } from "../../utils";

type Props = {
  transaction: Transaction;
};

const TransactionsTableRow = ({ transaction }: Props) => {
  return (
    <tr>
      <td>{formatDate(transaction.date)}</td>
      <td>{transaction.type === "income" ? "+" : "-"}</td>
      <td>{transaction.category}</td>
      <td>
        <EllipsisTooltip text={transaction.comment} />
      </td>
      <td className={transaction.type === "income" ? "income" : "expense"}>
        <EllipsisTooltip text={formatAmount(transaction.sum)} />
      </td>
      <td>
        <EditButton transaction={transaction} />
      </td>
      <td>
        <DeleteButton transaction={transaction} />
      </td>
    </tr>
  );
};

export default TransactionsTableRow;
