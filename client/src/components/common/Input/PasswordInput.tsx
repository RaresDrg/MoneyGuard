import { useState, useRef } from "react";
import { Field, ErrorMessage, useFormikContext } from "formik";
import { renderIcon } from "../../../utils";
import UseAnimations from "react-useanimations";
import visibility from "react-useanimations/lib/visibility";

type Props = {
  className?: string;
  id: string;
  name: string;
  placeholder: string;
};

const PasswordInput = ({ className, id, name, placeholder }: Props) => {
  const [isVisible, setIsVisible] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const { values, setFieldValue } = useFormikContext<Record<string, string>>();
  const showToggleIcon = !!values[name]?.length;

  function togglePasswordClick() {
    if (!isVisible) inputRef.current?.focus();
    setIsVisible((prev) => !prev);
  }
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === " ") e.preventDefault();
  }
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value.replace(/\s/g, "");
    setFieldValue(name, value);
  }

  return (
    <div className={className}>
      <label>
        <Field
          type={isVisible ? "text" : "password"}
          innerRef={inputRef}
          id={id}
          name={name}
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
        />
        {renderIcon("icon-password")}
      </label>
      <ErrorMessage className="error" name={name} component="p" />

      {showToggleIcon && (
        <UseAnimations
          title={isVisible ? "Hide password" : "Show password"}
          animation={visibility}
          onClick={togglePasswordClick}
          size={30}
          className="toggle-icon"
          strokeColor="currentColor"
          speed={2}
        />
      )}
    </div>
  );
};

export default PasswordInput;
