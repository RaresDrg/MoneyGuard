import { Field, ErrorMessage } from "formik";
import { renderIcon, notify } from "../../../utils";

type Props = {
  className?: string;
  id: string;
  name: string;
  placeholder: string;
  icon?: string;
  maxLength?: number;
};

const TextInput = (props: Props) => {
  const { className, id, name, placeholder, icon, maxLength } = props;

  function handlePaste(e: React.ClipboardEvent<HTMLInputElement>) {
    if (maxLength) {
      const pastedValue = e.clipboardData.getData("text");
      const currentValue = e.currentTarget.value;
      const limit = maxLength - 1;
      if (currentValue.length + pastedValue.length > limit) {
        const msg = `Invalid paste: ${name} cannot exceed ${limit} characters`;
        notify.warning(msg);
        e.preventDefault();
      }
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
          maxLength={maxLength}
          onPaste={handlePaste}
        />
        {icon && renderIcon(icon)}
      </label>
      <ErrorMessage className="error" name={name} component="p" />
    </div>
  );
};

export default TextInput;
