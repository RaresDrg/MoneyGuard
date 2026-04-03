import { createContext, ReactNode } from "react";
import { useMediaQuery } from "react-responsive";

type DeviceInfo = {
  isOnMobile: boolean;
  isOnTablet: boolean;
  isOnDesktop: boolean;
  isRetina: boolean;
};

const ResponsiveContext = createContext<DeviceInfo | null>(null);

const ResponsiveProvider = ({ children }: { children: ReactNode }) => {
  const isOnMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const isOnTablet = useMediaQuery({
    query: "(min-width: 768px) and (max-width: 1279px)",
  });
  const isOnDesktop = useMediaQuery({ query: "(min-width: 1280px)" });
  const isRetina = useMediaQuery({ query: "(min-resolution: 2dppx)" });

  const deviceInfo = { isOnMobile, isOnTablet, isOnDesktop, isRetina };

  return (
    <ResponsiveContext.Provider value={deviceInfo}>
      {children}
    </ResponsiveContext.Provider>
  );
};

export { ResponsiveContext, ResponsiveProvider };
