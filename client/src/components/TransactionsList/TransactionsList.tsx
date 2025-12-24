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

const TransactionsList = ({ className, transactions, observerRef }: Props) => {
  const dispatch = useAppDispatch();
  const { openModal } = useModal();

  function handleClick(action: "delete" | "edit", transaction: Transaction) {
    dispatch(setTargetedTransaction(transaction));
    openModal(`${action}TransactionModal`);
  }

  return (
    <ul className={className}>
      {transactions.map((item, index) => (
        <li
          key={item.id}
          ref={index === transactions.length - 1 ? observerRef : null}
          className={`${item.type === "income" ? "income" : "expense"}`}
        >
          <p>
            <span>Date</span>
            <span>{formatDate(item.date)}</span>
          </p>
          <p>
            <span>Type</span>
            <span>{item.type === "income" ? "+" : "-"}</span>
          </p>
          <p>
            <span>Category</span>
            <span>{item.category}</span>
          </p>
          <p>
            <span>Comment</span>
            <EllipsisTooltip text={item.comment} />
          </p>
          <p className="sum">
            <span>Sum</span>
            <EllipsisTooltip text={formatAmount(item.sum)} />
          </p>
          <p>
            <DeleteButton onClick={() => handleClick("delete", item)} />
            <EditButton onClick={() => handleClick("edit", item)} />
          </p>
        </li>
      ))}
    </ul>
  );
};

export default TransactionsList;
