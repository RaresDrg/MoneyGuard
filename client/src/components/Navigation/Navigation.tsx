import { NavLink } from "react-router-dom";
import { renderIcon } from "../../utils";

type Props = {
  className?: string;
};

const Navigation = ({ className }: Props) => {
  return (
    <nav className={className}>
      <NavLink to="/dashboard" end>
        <div className="icon">{renderIcon("icon-home")}</div>
        <span>Home</span>
      </NavLink>
      <NavLink to="statistics">
        <div className="icon">{renderIcon("icon-statistics")}</div>
        <span>Statistics</span>
      </NavLink>
      <NavLink to="currency">
        <div className="icon">{renderIcon("icon-currency")}</div>
        <span>Currency</span>
      </NavLink>
    </nav>
  );
};

export default Navigation;
