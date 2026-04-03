import { Link } from "react-router-dom";
import { Icon } from "..";

type Props = {
  className?: string;
};

const Logo = ({ className }: Props) => {
  return (
    <Link to="/" state={{ skipIntro: true }} className={className}>
      <Icon name="icon-logo" />
      <span>Money Guard</span>
    </Link>
  );
};

export default Logo;
