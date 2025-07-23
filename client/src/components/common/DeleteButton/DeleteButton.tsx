import type { Transaction } from "../../../App.types";
import { useModals, useAppDispatch } from "../../../hooks";
import { setTargetedTransaction } from "../../../redux/transactions/slice";

type Props = {
  className?: string;
  transaction: Transaction;
};

const DeleteButton = ({ className: styles, transaction }: Props) => {
  const { openModal } = useModals();
  const dispatch = useAppDispatch();

  function handleClick() {
    dispatch(setTargetedTransaction(transaction));
    openModal("deleteModal");
  }

  return (
    <button type="button" className={styles} onClick={handleClick}>
      Delete
    </button>
  );
};

export default DeleteButton;
