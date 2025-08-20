import type { Transaction } from "../../App.types";
import { DeleteButton, EditButton, EllipsisTooltip } from "../common";
import { formatDate, formatAmount } from "../../utils";
import { useAppDispatch, useModals } from "../../hooks";
import { setTargetedTransaction } from "../../redux/transactions/slice";

type Props = {
  transaction: Transaction;
  observerRef: null | ((node: HTMLElement | null) => void);
};

const TransactionsTableRow = ({ transaction, observerRef }: Props) => {
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

  return (
    <tr ref={observerRef} className="animate__animated animate__fadeIn">
      <td>{formatDate(date)}</td>
      <td>{type === "income" ? "+" : "-"}</td>
      <td>{category}</td>
      <td>
        <EllipsisTooltip text={comment} />
      </td>
      <td className={type === "income" ? "income" : "expense"}>
        <EllipsisTooltip text={formatAmount(sum)} />
      </td>
      <td>
        <EditButton handleClick={handleEditClick} />
      </td>
      <td>
        <DeleteButton handleClick={handleDeleteClick} />
      </td>
    </tr>
  );
};

export default TransactionsTableRow;
