import { useSelector } from "react-redux";
import { selectModals } from "../redux/modals/selectors";
import { store } from "../redux/store";
import { setModalOpen, setModalsClose } from "../redux/modals/slice";
import { useReactResponsive } from ".";

const useModals = () => {
  const { isOnMobile } = useReactResponsive();

  const modals = useSelector(selectModals);

  function openModal(modal: keyof typeof modals) {
    store.dispatch(setModalOpen(modal));
  }

  function closeModal() {
    const modalElements = document.querySelectorAll(".modal");
    const formElements = document.querySelectorAll(".modal > div");

    const oldClass = isOnMobile ? "animate__zoomIn" : "animate__fadeInDown";
    const newClass = isOnMobile ? "animate__hinge" : "animate__fadeOutUp";

    formElements.forEach((form) => form.classList.replace(oldClass, newClass));
    modalElements.forEach((modal) => modal.classList.add("hidden"));
    setTimeout(() => store.dispatch(setModalsClose()), 500);
  }

  return { modals, openModal, closeModal };
};

export default useModals;
