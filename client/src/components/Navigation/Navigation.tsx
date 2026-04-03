import { NavLink } from "react-router-dom";
import { Icon } from "../common";

type Props = {
  className?: string;
};

const Navigation = ({ className }: Props) => {
  return (
    <nav className={className}>
      <NavLink to="/dashboard" end>
        <div className="icon">
          <Icon name="icon-home" />
        </div>
        <span>Home</span>
      </NavLink>
      <NavLink to="statistics">
        <div className="icon">
          <Icon name="icon-statistics" />
        </div>
        <span>Statistics</span>
      </NavLink>
      <NavLink to="currency">
        <div className="icon">
          <Icon name="icon-currency" />
        </div>
        <span>Currency</span>
      </NavLink>
    </nav>
  );
};

export default Navigation;
