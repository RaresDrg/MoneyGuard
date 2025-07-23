import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useReactResponsive, useAppDispatch } from "../../hooks";
import { getList } from "../../redux/transactions/operations";
import { Header, Navigation, Modals } from "..";
import { Section, Container, Balance, LoadingSpinner } from "../common";

type Props = {
  className?: string;
};

const SharedLayout = ({ className: styles }: Props) => {
  const [shouldWait, setShouldWait] = useState(true);
  const { isOnMobile, isOnDesktop } = useReactResponsive();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getList())
      .unwrap()
      .then(() => {})
      .catch(() => {})
      .finally(() => setShouldWait(false));
  }, []);

  if (shouldWait) return <LoadingSpinner />;

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
