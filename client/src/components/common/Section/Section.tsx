import { ReactElement } from "react";

type Props = {
  className?: string;
  children: ReactElement;
};

const Section = ({ className, children }: Props) => {
  return <section className={className}>{children}</section>;
};

export default Section;
