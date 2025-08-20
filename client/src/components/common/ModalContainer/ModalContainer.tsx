import { ReactElement, useEffect } from "react";
import ReactDOM from "react-dom";
import { useModals } from "../../../hooks";

type Props = {
  className?: string;
  children: ReactElement;
};

const ModalContainer = ({ children, className: styles }: Props) => {
  const { closeModal } = useModals();

  function handleBackdropMouseDown(e: React.MouseEvent) {
    if (e.target === e.currentTarget) closeModal();
  }

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") closeModal();
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return ReactDOM.createPortal(
    <div className={`${styles} modal`} onMouseDown={handleBackdropMouseDown}>
      {children}
    </div>,
    document.getElementById("modal-root")!
  );
};

export default ModalContainer;
