type Props = {
  className?: string;
  type: "button" | "submit";
  variant: "gradient" | "white";
  text: string;
  isDisabled?: boolean;
  handlerFunction?: () => void;
};

const FormButton = (props: Props) => {
  const { className, type, text, isDisabled, handlerFunction } = props;

  return (
    <button
      type={type}
      className={className}
      onClick={() => handlerFunction?.()}
      disabled={isDisabled}
    >
      {text}
    </button>
  );
};

export default FormButton;
