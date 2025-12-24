import { createElement } from "react";
import TextInput from "./TextInput";
import PasswordInput from "./PasswordInput";
import DecimalInput from "./DecimalInput";

type Props = {
  className?: string;
  type: "text" | "password" | "decimal";
  id: string;
  name: string;
  placeholder: string;
  icon?: string;
  maxLength?: number;
};

const inputMap = {
  text: TextInput,
  password: PasswordInput,
  decimal: DecimalInput,
};

const Input = (props: Props) => {
  return createElement(inputMap[props.type], props);
};

export default Input;
