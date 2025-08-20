import TextInput from "./TextInput";
import PasswordInput from "./PasswordInput";
import NumberInput from "./NumberInput";

type Props = {
  className?: string;
  type: "text" | "password" | "number";
  id: string;
  name: string;
  placeholder: string;
  icon?: string;
};

const Input = (props: Props) => {
  switch (props.type) {
    case "text": {
      return <TextInput {...props} />;
    }
    case "password": {
      return <PasswordInput {...props} />;
    }
    case "number": {
      return <NumberInput {...props} />;
    }
    default:
      return null;
  }
};

export default Input;
