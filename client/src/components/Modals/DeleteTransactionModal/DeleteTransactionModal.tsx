import { useState } from "react";
import { useModals, useAppDispatch, useTransactions } from "../../../hooks";
import { deleteTransaction } from "../../../redux/transactions/operations";
import { notify } from "../../../utils";
import {
  ModalContainer,
  FormContainer,
  FormTitle,
  FormButton,
} from "../../common";

type Props = {
  className?: string;
};

const DeleteTransactionModal = ({ className: styles }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { closeModal } = useModals();
  const dispatch = useAppDispatch();
  const { targetedTransaction } = useTransactions();

  function handleDelete() {
    setIsSubmitting(true);

    dispatch(deleteTransaction(targetedTransaction!._id))
      .unwrap()
      .then((response) => {
        notify.success(response.message);
        closeModal();
      })
      .catch((error) => {
        notify.error(error);
        setIsSubmitting(false);
      });
  }

  return (
    <ModalContainer className={styles}>
      <FormContainer>
        <>
          <FormTitle text="Are you sure you want to delete the transaction ?" />
          <FormButton
            type="button"
            variant="gradient"
            text="Delete"
            handlerFunction={handleDelete}
            isDisabled={isSubmitting}
          />
          <FormButton
            type="button"
            variant="white"
            text="cancel"
            handlerFunction={closeModal}
          />
        </>
      </FormContainer>
    </ModalContainer>
  );
};

export default DeleteTransactionModal;
