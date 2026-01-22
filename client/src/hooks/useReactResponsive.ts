import { useMediaQuery } from "react-responsive";

const useReactResponsive = () => {
  return {
    isOnMobile: useMediaQuery({ maxWidth: 767.9 }),
    isOnTablet: useMediaQuery({ minWidth: 768, maxWidth: 1279.9 }),
    isOnDesktop: useMediaQuery({ minWidth: 1280 }),
    isRetina: useMediaQuery({ minResolution: "2dppx" }),
  };
};

export default useReactResponsive;
