import { createElement } from "react";
import { useReduxState } from "../../../hooks";
import AddTransactionModal from "./AddTransactionModal/AddTransactionModal.styled";
import EditTransactionModal from "./EditTransactionModal/EditTransactionModal.styled";
import DeleteTransactionModal from "./DeleteTransactionModal/DeleteTransactionModal.styled";
import LogoutModal from "./LogoutModal/LogoutModal.styled";

const modalMap = {
  addTransactionModal: AddTransactionModal,
  editTransactionModal: EditTransactionModal,
  deleteTransactionModal: DeleteTransactionModal,
  logoutModal: LogoutModal,
};

const GlobalModal = () => {
  const activeModal = useReduxState("selectActiveModal");
  return activeModal ? createElement(modalMap[activeModal]) : null;
};

export default GlobalModal;
