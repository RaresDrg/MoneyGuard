import { ReactElement } from "react";

type Props = {
  className?: string;
  children: ReactElement;
};

const FormContainer = ({ className: styles, children }: Props) => {
  return (
    <div className={`${styles} animate__animated animate__fadeInDown`}>
      {children}
    </div>
  );
};

export default FormContainer;
