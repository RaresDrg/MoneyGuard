import { useSelector } from "react-redux";
import { selectModals } from "../redux/modals/selectors";
import { store } from "../redux/store";
import { setModalOpen, setModalsClose } from "../redux/modals/slice";

const useModals = () => {
  const modals = useSelector(selectModals);

  function openModal(modal: keyof typeof modals) {
    store.dispatch(setModalOpen(modal));
  }

  function closeModal() {
    const modalElement = document.querySelector(".modal");

    if (modalElement) {
      modalElement.classList.add("hidden");
      setTimeout(() => store.dispatch(setModalsClose()), 500);
    }
  }

  return { modals, openModal, closeModal };
};

export default useModals;
