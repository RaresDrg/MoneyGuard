import { Field, ErrorMessage } from "formik";

type Props = {
  className?: string;
  id: string;
  name: string;
  placeholder: string;
};

const NumberInput = ({ className, id, name, placeholder }: Props) => {
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (["E", "e", "-", "+"].includes(e.key)) e.preventDefault();
  }
  function handleWheel(e: React.WheelEvent<HTMLInputElement>) {
    e.currentTarget.blur();
  }

  return (
    <div className={className}>
      <label>
        <Field
          type="number"
          id={id}
          name={name}
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
          onWheel={handleWheel}
        />
      </label>
      <ErrorMessage className="error" name={name} component="p" />
    </div>
  );
};

export default NumberInput;
