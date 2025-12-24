import { Outlet } from "react-router-dom";
import { useReactResponsive } from "../../hooks";
import { Header, Navigation, Footer } from "..";
import { Section, Container, Balance } from "../common";

type Props = {
  className?: string;
};

const SharedLayout = ({ className }: Props) => {
  const { isOnMobile } = useReactResponsive();

  return (
    <>
      <Header />
      <Section className={className}>
        <Container>
          <Navigation />
          {!isOnMobile && <Balance />}
          <Outlet />
        </Container>
      </Section>
      <Footer />
    </>
  );
};

export default SharedLayout;
