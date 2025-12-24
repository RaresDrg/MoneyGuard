import { useState } from "react";
import { Field, ErrorMessage, useFormikContext } from "formik";
import { DECIMAL_INPUT_ALLOWED_KEYS } from "../../../constants";
import {
  validateInput,
  formatWithCommas,
  sanitizePastedValue,
} from "../../../utils";

type Props = {
  className?: string;
  id: string;
  name: string;
  placeholder: string;
};

const DecimalInput = ({ className, id, name, placeholder }: Props) => {
  const { values, setFieldValue } = useFormikContext<Record<string, unknown>>();

  const [displayValue, setDisplayValue] = useState(
    values[name] ? formatWithCommas(Number(values[name]).toFixed(2)) : ""
  );

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.ctrlKey || e.metaKey) return;
    if (!DECIMAL_INPUT_ALLOWED_KEYS.includes(e.key)) e.preventDefault();
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const rawValue = e.target.value.replace(/,/g, "");

    if (rawValue === "") {
      setFieldValue(name, "");
      setDisplayValue("");
      return;
    }

    const isValidFormat = validateInput(rawValue);
    if (isValidFormat) {
      setFieldValue(name, rawValue);
      setDisplayValue(formatWithCommas(rawValue));
    }
  }

  function handlePaste(e: React.ClipboardEvent<HTMLInputElement>) {
    e.preventDefault();

    const pastedValue = e.clipboardData.getData("text");
    const cleanedValue = sanitizePastedValue(pastedValue);

    const isValidFormat = validateInput(cleanedValue);
    if (isValidFormat) {
      setFieldValue(name, cleanedValue);
      setDisplayValue(formatWithCommas(cleanedValue));
    }
  }

  return (
    <div className={className}>
      <label>
        <Field
          type="text"
          id={id}
          name={name}
          placeholder={placeholder}
          value={displayValue}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          onPaste={handlePaste}
        />
      </label>
      <ErrorMessage className="error" name={name} component="p" />
    </div>
  );
};

export default DecimalInput;
