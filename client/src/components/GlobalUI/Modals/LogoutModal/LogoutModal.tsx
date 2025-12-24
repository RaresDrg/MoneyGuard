import { useState } from "react";
import { useModal } from "../../../../hooks";
import { authService } from "../../../../services";
import { notify, handleRequestFlow, resetStore } from "../../../../utils";
import {
  ModalContainer,
  FormContainer,
  FormButton,
  Logo,
} from "../../../common";

type Props = {
  className?: string;
};

const LogoutModal = ({ className }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { closeModal } = useModal();

  function handleLogout() {
    setIsSubmitting(true);
    closeModal();
    handleRequestFlow({
      request: () => authService.logout(),
      delay: 1500,
      loadingType: "screen",
      onFinally: () => {
        resetStore();
        sessionStorage.removeItem("sessionId");
        notify.success("Logged out successfully");
      },
    });
  }

  return (
    <ModalContainer className={className}>
      <FormContainer>
        <>
          <Logo />
          <p>Are you sure you want to log out ?</p>
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
