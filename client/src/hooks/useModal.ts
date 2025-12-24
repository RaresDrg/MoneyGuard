import { useAppDispatch } from ".";
import { setActiveModal } from "../redux/general/actions";
import type { ModalType } from "../App.types";

const useModal = () => {
  const dispatch = useAppDispatch();

  function openModal(modal: ModalType) {
    dispatch(setActiveModal(modal));
  }

  function closeModal() {
    document.querySelector(".modal")?.classList.add("hidden");
    document.querySelector(".modal > :nth-child(1)")?.classList.add("hidden");
    setTimeout(() => dispatch(setActiveModal(null)), 500);
  }

  return { openModal, closeModal };
};

export default useModal;
