import { ReactElement } from "react";
import { useReactResponsive } from "../../../hooks";

type Props = {
  className?: string;
  children: ReactElement;
};

const FormContainer = ({ className, children }: Props) => {
  const { isOnMobile } = useReactResponsive();

  const styles = `${className} ${
    isOnMobile
      ? "animate__animated animate__zoomIn"
      : "animate__animated animate__fadeInDown"
  }`;

  return <div className={styles}>{children}</div>;
};

export default FormContainer;
