import { Outlet } from "react-router-dom";
import { useResponsive } from "../../hooks";
import { Header, Navigation, Footer } from "..";
import { Section, Container, Balance } from "../common";

type Props = {
  className?: string;
};

const SharedLayout = ({ className }: Props) => {
  const { isOnMobile } = useResponsive();

  return (
    <>
      <Header />
      <Section
        className={className}
        backgrounds={{ m: "gradientBg", t: "gradientBg", d: "gradientBg" }}
      >
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
