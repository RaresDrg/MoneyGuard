import { MouseEvent } from "react";
import type { FormButtonProps } from "../../../App.types";

const FormButton = (props: FormButtonProps) => {
  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();

    if (props.handlerFunction) {
      props.handlerFunction();
    }
  }

  return (
    <button
      type={props.type}
      className={props.className}
      onClick={handleClick}
      disabled={props.isDisabled}
      data-variant={props.variant}
    >
      {props.text}
    </button>
  );
};

export default FormButton;
