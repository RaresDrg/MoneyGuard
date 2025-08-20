import type { Transaction } from "../../App.types";
import { DeleteButton, EditButton, EllipsisTooltip } from "../common";
import { formatDate, formatAmount } from "../../utils";
import { useAppDispatch, useModals } from "../../hooks";
import { setTargetedTransaction } from "../../redux/transactions/slice";

type Props = {
  className?: string;
  transaction: Transaction;
  observerRef: null | ((node: HTMLElement | null) => void);
};

const TransactionsListItem = (props: Props) => {
  const { className, transaction, observerRef } = props;
  const { date, type, category, comment, sum } = transaction;

  const dispatch = useAppDispatch();
  const { openModal } = useModals();

  function handleDeleteClick() {
    dispatch(setTargetedTransaction(transaction));
    openModal("deleteModal");
  }
  function handleEditClick() {
    dispatch(setTargetedTransaction(transaction));
    openModal("editModal");
  }

  const styles = `${className} animate__animated animate__jackInTheBox`;

  return (
    <li ref={observerRef} className={styles}>
      <p>
        <span>Date</span>
        <span>{formatDate(date)}</span>
      </p>
      <p>
        <span>Type</span>
        <span>{type === "income" ? "+" : "-"}</span>
      </p>
      <p>
        <span>Category</span>
        <span>{category}</span>
      </p>
      <p>
        <span>Comment</span>
        <EllipsisTooltip text={comment} />
      </p>
      <p>
        <span>Sum</span>
        <EllipsisTooltip text={formatAmount(sum)} />
      </p>
      <p>
        <DeleteButton handleClick={handleDeleteClick} />
        <EditButton handleClick={handleEditClick} />
      </p>
    </li>
  );
};

export default TransactionsListItem;
