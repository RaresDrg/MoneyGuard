import { ReactElement, useEffect } from "react";
import { useModal } from "../../../hooks";

type Props = {
  className?: string;
  children: ReactElement;
};

const ModalContainer = ({ children, className }: Props) => {
  const { closeModal } = useModal();

  function handleBackdropMouseDown(e: React.MouseEvent) {
    if (e.target === e.currentTarget) closeModal();
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === "Escape") closeModal();
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className={`${className} modal`} onMouseDown={handleBackdropMouseDown}>
      {children}
    </div>
  );
};

export default ModalContainer;
