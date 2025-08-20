import { Field, ErrorMessage, useFormikContext } from "formik";
import { renderIcon } from "../../../utils";

type Props = {
  className?: string;
  id: string;
  name: string;
  placeholder: string;
  icon?: string;
};

const TextInput = ({ className, id, name, placeholder, icon }: Props) => {
  const { errors, touched } = useFormikContext<Record<string, string>>();
  const onError = !!(errors[name] && touched[name]);

  return (
    <div className={className}>
      <label className={`${onError ? "onError" : ""}`}>
        <Field type="text" id={id} name={name} placeholder={placeholder} />
        {icon && renderIcon(icon)}
      </label>
      <ErrorMessage className="error" name={name} component="p" />
    </div>
  );
};

export default TextInput;
