import { ReactNode, useEffect, useRef } from "react";
import { useModal, useReduxState } from "../../../hooks";
import { FOCUSABLE_ELEMENTS } from "../../../constants";

type Props = {
  className?: string;
  children: ReactNode;
};

const ModalContainer = ({ className, children }: Props) => {
  const activeLoader = useReduxState("selectActiveLoader");
  const { closeModal } = useModal();

  const triggerRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    triggerRef.current = document.activeElement as HTMLButtonElement;
    modalRef.current?.focus();

    return () => triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (activeLoader) {
        e.preventDefault();
        return;
      }

      switch (e.key) {
        case "Escape": {
          closeModal();
          break;
        }
        case "Tab": {
          const modal = modalRef.current;
          const focusable = modal?.querySelectorAll(`${FOCUSABLE_ELEMENTS}`);

          if (!focusable?.length) {
            e.preventDefault();
            modal?.focus();
            return;
          }

          const first = focusable[0] as HTMLElement;
          const last = focusable[focusable.length - 1] as HTMLElement;

          if (e.shiftKey) {
            if (
              document.activeElement === modal ||
              document.activeElement === first
            ) {
              e.preventDefault();
              last.focus();
            }
          } else {
            if (document.activeElement === last) {
              e.preventDefault();
              first.focus();
            }
          }
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [activeLoader, closeModal]);

  return (
    <div
      ref={modalRef}
      tabIndex={-1}
      className={`${className} modal`}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) closeModal();
      }}
      role="dialog"
      aria-modal="true"
    >
      {children}
    </div>
  );
};

export default ModalContainer;
