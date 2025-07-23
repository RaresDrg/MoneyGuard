import { useModals } from "../../hooks";

import LogoutModal from "./LogoutModal/LogoutModal.styled";
import AddTransactionModal from "./AddTransactionModal/AddTransactionModal.styled";
import DeleteTransactionModal from "./DeleteTransactionModal/DeleteTransactionModal.styled";
import EditTransactionModal from "./EditTransactionModal/EditTransactionModal.styled";

// todo: lazy

const Modals = () => {
  const { modals } = useModals();

  return (
    <>
      {modals.logoutModal && <LogoutModal />}
      {modals.addModal && <AddTransactionModal />}
      {modals.deleteModal && <DeleteTransactionModal />}
      {modals.editModal && <EditTransactionModal />}
    </>
  );
};

export default Modals;
