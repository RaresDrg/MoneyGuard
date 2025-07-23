import { ReactElement, useEffect } from "react";
import { useModals } from "../../../hooks";

type Props = {
  className?: string;
  children: ReactElement;
};

const ModalContainer = ({ children, className: styles }: Props) => {
  const { closeModal } = useModals();

  useEffect(() => {
    function handleMouseDown(e: MouseEvent) {
      if ((e.target as Element).classList.contains("modal")) closeModal();
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") closeModal();
    }

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return <div className={`${styles} modal`}>{children}</div>;
};

export default ModalContainer;
