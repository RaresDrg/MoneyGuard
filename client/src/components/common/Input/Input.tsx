import { useState } from "react";
import { Field, ErrorMessage } from "formik";
import type { InputProps } from "../../../App.types";
import { renderIcon } from "../../../utils";
import UseAnimations from "react-useanimations";
import visibility from "react-useanimations/lib/visibility";

const Input = (props: InputProps) => {
  const [isVisible, setIsVisible] = useState(false);

  function handleClick() {
    if (!isVisible) {
      const field = document.querySelector(`#${props.id}`) as HTMLInputElement;
      field.focus();
    }

    setIsVisible((prev) => !prev);
  }

  return (
    <div className={`${props.className} ${props.hasErrors ? "onError" : ""}`}>
      <label>
        <Field
          type={isVisible ? "text" : props.type}
          id={props.id}
          name={props.name}
          placeholder={props.placeholder}
        />
        {props.icon && renderIcon(props.icon)}
      </label>
      <ErrorMessage className="error" name={props.name} component="p" />

      {props.type === "password" && props.values && (
        <UseAnimations
          animation={visibility}
          onClick={handleClick}
          size={30}
          className="showPassword"
          strokeColor="currentColor"
          speed={2}
        />
      )}
    </div>
  );
};

export default Input;
