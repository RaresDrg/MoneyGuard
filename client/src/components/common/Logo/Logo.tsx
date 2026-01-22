import { Link } from "react-router-dom";
import { renderIcon } from "../../../utils";

type Props = {
  className?: string;
};

const Logo = ({ className }: Props) => {
  return (
    <Link to="/" state={{ skipIntro: true }} className={className}>
      {renderIcon("icon-logo")}
      <span>Money Guard</span>
    </Link>
  );
};

export default Logo;
