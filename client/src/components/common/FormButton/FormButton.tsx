type Props = {
  className?: string;
  type: "button" | "submit";
  variant: "gradient" | "white";
  text: string;
  isDisabled?: boolean;
  handlerFunction?: () => void;
};

const FormButton = (props: Props) => {
  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    if (props.handlerFunction) props.handlerFunction();
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
