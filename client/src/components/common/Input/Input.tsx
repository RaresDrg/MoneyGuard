import TextInput from "./TextInput";
import PasswordInput from "./PasswordInput";
import DecimalInput from "./DecimalInput";

type Props = {
  className?: string;
  type: "text" | "password" | "decimalInput";
  id: string;
  name: string;
  placeholder: string;
  icon?: string;
  maxLength?: number;
};

const Input = (props: Props) => {
  switch (props.type) {
    case "text": {
      return <TextInput {...props} />;
    }
    case "password": {
      return <PasswordInput {...props} />;
    }
    case "decimalInput": {
      return <DecimalInput {...props} />;
    }
    default:
      return null;
  }
};

export default Input;
