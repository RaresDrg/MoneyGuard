import { renderIcon } from "../../../utils";

type Props = {
  className?: string;
};

const Logo = ({ className }: Props) => {
  return (
    <a href="/" className={className}>
      {renderIcon("icon-logo")}
      <span>Money Guard</span>
    </a>
  );
};

export default Logo;
