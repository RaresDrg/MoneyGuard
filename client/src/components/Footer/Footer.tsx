import { Container } from "../common";
import { CURRENT_YEAR } from "../../constants";

type Props = {
  className?: string;
};

const Footer = ({ className }: Props) => {
  return (
    <footer className={className}>
      <Container>
        <span>Track smarter. Spend better</span>
        <span>&copy; MoneyGuard {CURRENT_YEAR}</span>
      </Container>
    </footer>
  );
};

export default Footer;
