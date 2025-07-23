import { useMediaQuery } from "react-responsive";

const useReactResponsive = () => {
  return {
    isOnMobile: useMediaQuery({ maxWidth: 767.5 }),
    isOnTablet: useMediaQuery({ minWidth: 768, maxWidth: 1279.5 }),
    isOnDesktop: useMediaQuery({ minWidth: 1280 }),
  };
};

export default useReactResponsive;
