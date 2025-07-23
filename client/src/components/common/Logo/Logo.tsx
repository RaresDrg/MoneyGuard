import { renderIcon } from "../../../utils";

interface Props {
  className?: string;
}

const Logo = ({ className: styles }: Props) => {
  return (
    <a href="/" className={styles}>
      {renderIcon("icon-logo")}
      <span>Money Guard</span>
    </a>
  );
};

export default Logo;
