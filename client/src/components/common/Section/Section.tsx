import { ReactElement } from "react";

type Props = {
  className?: string;
  children: ReactElement;
  variant: "loginBg" | "registerBg" | "gradientBg";
};

const Section = ({ className: styles, children }: Props) => {
  return (
    <section
      className={`${styles} animate__animated animate__fadeIn animate__slow`}
    >
      {children}
    </section>
  );
};

export default Section;
