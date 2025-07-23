import { useState } from "react";
import { useModals, useReactResponsive, useAppDispatch } from "../../../hooks";
import { logout } from "../../../redux/auth/operations";
import { notify } from "../../../utils";
import { ModalContainer, FormContainer, FormButton, Logo } from "../../common";

type Props = {
  className?: string;
};

const LogoutModal = ({ className: styles }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isOnMobile } = useReactResponsive();
  const { closeModal } = useModals();
  const dispatch = useAppDispatch();

  function handleLogout() {
    setIsSubmitting(true);
    closeModal();
    dispatch(logout()).finally(() => notify.success("Logged out successfully"));
  }

  return (
    <ModalContainer className={styles}>
      <FormContainer>
        <>
          {!isOnMobile && <Logo />}
          <p> Are you sure you want to log out ?</p>
          <FormButton
            type="button"
            variant="gradient"
            text="logout"
            handlerFunction={handleLogout}
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

export default LogoutModal;
