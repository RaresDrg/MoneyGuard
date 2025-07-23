import { Container, Logo, EllipsisTooltip, LogoutBtn } from "../common";
import { useAuth } from "../../hooks";

type Props = {
  className?: string;
};

const Header = ({ className: styles }: Props) => {
  const { user } = useAuth();

  return (
    <header
      className={`${styles} animate__animated animate__fadeIn animate__slow`}
    >
      <Container>
        <Logo />
        <EllipsisTooltip className="username" text={user!.name} />
        <span className="separator"></span>
        <LogoutBtn />
      </Container>
    </header>
  );
};

export default Header;
