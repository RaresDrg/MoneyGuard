import { ReactElement } from "react";

type Props = {
  className?: string;
  children: ReactElement;
};

const FormContainer = ({ className, children }: Props) => {
  return <div className={className}>{children}</div>;
};

export default FormContainer;
