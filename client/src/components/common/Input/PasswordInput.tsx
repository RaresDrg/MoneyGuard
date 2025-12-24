import { useState, useEffect, useRef } from "react";
import { Field, ErrorMessage } from "formik";
import { renderIcon, notify } from "../../../utils";

type Props = {
  className?: string;
  id: string;
  name: string;
  placeholder: string;
};

const PasswordInput = ({ className, id, name, placeholder }: Props) => {
  const [isVisible, setIsVisible] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isVisible) inputRef.current?.focus();
  }, [isVisible]);

  function handlePaste(e: React.ClipboardEvent<HTMLInputElement>) {
    const pastedValue = e.clipboardData.getData("text");
    const currentValue = e.currentTarget.value;
    if (currentValue.length + pastedValue.length > 50) {
      notify.warning("Invalid paste: Password cannot exceed 50 characters");
      e.preventDefault();
    }
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
          maxLength={51}
          onPaste={handlePaste}
        />
        {renderIcon("icon-password")}
      </label>
      <ErrorMessage className="error" name={name} component="p" />

      {!!inputRef.current?.value.length && (
        <button
          type="button"
          onClick={() => setIsVisible((prev) => !prev)}
          title={isVisible ? "Hide password" : "Show password"}
          className={`toggle-btn ${isVisible ? "visible" : ""}`}
        >
          {renderIcon("icon-eye")}
        </button>
      )}
    </div>
  );
};

export default PasswordInput;
