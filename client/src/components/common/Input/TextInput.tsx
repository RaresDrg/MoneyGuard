import { Field, ErrorMessage } from "formik";
import { renderIcon } from "../../../utils";

type Props = {
  className?: string;
  id: string;
  name: string;
  placeholder: string;
  icon?: string;
};

const TextInput = ({ className, id, name, placeholder, icon }: Props) => {
  return (
    <div className={className}>
      <label>
        <Field type="text" id={id} name={name} placeholder={placeholder} />
        {icon && renderIcon(icon)}
      </label>
      <ErrorMessage className="error" name={name} component="p" />
    </div>
  );
};

export default TextInput;
