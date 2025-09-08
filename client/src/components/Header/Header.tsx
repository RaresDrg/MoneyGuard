import { Container, Logo, EllipsisTooltip, LogoutBtn } from "../common";
import { useAuth } from "../../hooks";

type Props = {
  className?: string;
};

const Header = ({ className }: Props) => {
  const { user } = useAuth();
  const styles = `${className} animate__animated animate__fadeIn animate__slow`;

  return (
    <header className={styles}>
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
