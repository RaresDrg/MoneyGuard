import { NavLink } from "react-router-dom";
import { renderIcon } from "../../utils";

type Props = {
  className?: string;
};

const Navigation = ({ className: styles }: Props) => {
  return (
    <nav className={`${styles} animate__animated animate__fadeInDown`}>
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
