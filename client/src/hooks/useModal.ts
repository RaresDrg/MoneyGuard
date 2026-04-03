import { useAppDispatch } from ".";
import { setActiveModal } from "../redux/general/actions";
import type { ModalType } from "../App.types";

const useModal = () => {
  const dispatch = useAppDispatch();

  function openModal(modal: ModalType) {
    dispatch(setActiveModal(modal));
  }

  function closeModal() {
    const modal = document.querySelector(".modal");

    if (modal instanceof HTMLElement) {
      modal.classList.add("hidden");
      modal.firstElementChild?.classList.add("hidden");
      modal.addEventListener(
        "animationend",
        () => dispatch(setActiveModal(null)),
        { once: true },
      );
    }
  }

  return { openModal, closeModal };
};

export default useModal;
