import { useState } from "react";
import { useModal, useAppDispatch, useReduxState } from "../../../../hooks";
import { transactionsService } from "../../../../services";
import { deleteTransaction } from "../../../../redux/transactions/actions";
import { updateUserBalance } from "../../../../redux/auth/actions";
import { notify, handleRequestFlow } from "../../../../utils";
import { ModalContainer, FormContainer, FormButton } from "../../../common";

type Props = {
  className?: string;
};

const DeleteTransactionModal = ({ className }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { closeModal } = useModal();
  const dispatch = useAppDispatch();
  const { id } = useReduxState("selectTargetedTransaction")!;

  function handleDelete() {
    setIsSubmitting(true);
    handleRequestFlow({
      request: () => transactionsService.deleteTransaction(id),
      delay: 500,
      loadingType: "spinner",
      onSuccess: (res) => {
        dispatch(deleteTransaction(res.data.deletedTransaction.id));
        dispatch(updateUserBalance(res.data.updatedBalance));
        notify.success(res.message);
        closeModal();
      },
      onError: (error) => {
        notify.error(error);
        setIsSubmitting(false);
      },
    });
  }

  return (
    <ModalContainer className={className}>
      <FormContainer>
        <>
          <h2 className="form-title">Delete transaction</h2>
          <p>Are you sure you want to delete this transaction ?</p>
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
