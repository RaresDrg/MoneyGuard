import type { Transaction } from "../../../App.types";
import { useModals, useAppDispatch } from "../../../hooks";
import { setTargetedTransaction } from "../../../redux/transactions/slice";
import { renderIcon } from "../../../utils";

type Props = {
  className?: string;
  transaction: Transaction;
};

const EditButton = ({ className: styles, transaction }: Props) => {
  const { openModal } = useModals();
  const dispatch = useAppDispatch();

  function handleClick() {
    dispatch(setTargetedTransaction(transaction));
    openModal("editModal");
  }

  return (
    <button type="button" className={styles} onClick={handleClick}>
      Edit {renderIcon("icon-pencil")}
    </button>
  );
};

export default EditButton;
