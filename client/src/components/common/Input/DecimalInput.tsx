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
    values[name] ? formatWithCommas(Number(values[name]).toFixed(2)) : "",
  );

  function sync(value: string) {
    setFieldValue(name, value);
    setDisplayValue(value === "" ? value : formatWithCommas(value));
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.ctrlKey || e.metaKey) return;
    if (!DECIMAL_INPUT_ALLOWED_KEYS.includes(e.key)) e.preventDefault();
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const rawValue = e.target.value.replace(/,/g, "");

    if (rawValue === "") sync("");
    else if (validateInput(rawValue)) sync(rawValue);
  }

  function handlePaste(e: React.ClipboardEvent<HTMLInputElement>) {
    e.preventDefault();

    const pastedValue = e.clipboardData.getData("text");
    const cleanedValue = sanitizePastedValue(pastedValue);

    if (cleanedValue !== "" && validateInput(cleanedValue)) sync(cleanedValue);
  }

  return (
    <div className={className}>
      <label>
        <Field
          type="text"
          inputMode="decimal"
          id={id}
          name={name}
          value={displayValue}
          placeholder={placeholder}
          aria-label={placeholder}
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
