import { Outlet } from "react-router-dom";
import { useReactResponsive } from "../../hooks";
import { Header, Navigation, Modals } from "..";
import { Section, Container, Balance } from "../common";

type Props = {
  className?: string;
};

const SharedLayout = ({ className: styles }: Props) => {
  const { isOnMobile, isOnDesktop } = useReactResponsive();

  return (
    <>
      <Header />

      <Section variant="gradientBg" className={styles}>
        <Container>
          <Navigation />
          {!isOnMobile && <Balance />}
          {isOnDesktop && <div className="separator"></div>}
          <Outlet />
        </Container>
      </Section>

      <Modals />
    </>
  );
};

export default SharedLayout;
