import { DeleteButton, EditButton, EllipsisTooltip } from "../common";
import { formatDate, formatAmount } from "../../utils";
import { useAppDispatch, useModal } from "../../hooks";
import { setTargetedTransaction } from "../../redux/transactions/actions";
import type { Transaction } from "../../App.types";

type Props = {
  className?: string;
  transactions: Transaction[];
  observerRef: ((node: HTMLElement | null) => void) | null;
};

const TransactionsTable = ({ className, transactions, observerRef }: Props) => {
  const dispatch = useAppDispatch();
  const { openModal } = useModal();

  function handleClick(action: "delete" | "edit", transaction: Transaction) {
    dispatch(setTargetedTransaction(transaction));
    openModal(`${action}TransactionModal`);
  }

  return (
    <div className={className}>
      <div className="row header">
        <span>Date</span>
        <span>Type</span>
        <span>Category</span>
        <span>Comment</span>
        <span>Sum</span>
        <span></span>
        <span></span>
      </div>
      {transactions.map((item, index) => (
        <div
          key={item.id}
          ref={index === transactions.length - 1 ? observerRef : null}
          className="row body"
        >
          <span>{formatDate(item.date)}</span>
          <span>{item.type === "income" ? "+" : "-"}</span>
          <span>{item.category}</span>
          <EllipsisTooltip text={item.comment} />
          <EllipsisTooltip
            className={item.type === "income" ? "income" : "expense"}
            text={formatAmount(item.sum)}
          />
          <EditButton onClick={() => handleClick("edit", item)} />
          <DeleteButton onClick={() => handleClick("delete", item)} />
        </div>
      ))}
    </div>
  );
};

export default TransactionsTable;
