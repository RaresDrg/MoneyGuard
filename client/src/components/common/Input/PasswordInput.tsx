import { useState, useEffect, useRef } from "react";
import { Field, ErrorMessage } from "formik";
import { Icon } from "..";

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

  return (
    <div className={className}>
      <label>
        <Field
          type={isVisible ? "text" : "password"}
          innerRef={inputRef}
          id={id}
          name={name}
          placeholder={placeholder}
          aria-label={placeholder}
          maxLength={51}
        />
        <Icon name="icon-password" />
      </label>
      <ErrorMessage className="error" name={name} component="p" />

      {!!inputRef.current?.value.length && (
        <button
          type="button"
          onClick={() => setIsVisible((prev) => !prev)}
          title={isVisible ? "Hide password" : "Show password"}
          className={`toggle-btn ${isVisible ? "visible" : ""}`}
        >
          <Icon name="icon-eye" />
        </button>
      )}
    </div>
  );
};

export default PasswordInput;
