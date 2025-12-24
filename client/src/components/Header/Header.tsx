import { Container, Logo, EllipsisTooltip } from "../common";
import { useReduxState, useModal } from "../../hooks";
import { renderIcon } from "../../utils";

type Props = {
  className?: string;
};

const Header = ({ className }: Props) => {
  const userName = useReduxState("selectUserName");
  const { openModal } = useModal();

  return (
    <header className={className}>
      <Container>
        <Logo />
        <EllipsisTooltip className="username" text={userName} />
        <span className="separator"></span>
        <button
          type="button"
          className="logout-btn"
          onClick={() => openModal("logoutModal")}
        >
          {renderIcon("icon-exit")}
          <span>Exit</span>
        </button>
      </Container>
    </header>
  );
};

export default Header;
