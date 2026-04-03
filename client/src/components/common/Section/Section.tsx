import { ReactNode, useEffect, useRef } from "react";
import { useResponsive } from "../../../hooks";
import { getCloudinaryImage } from "../../../utils";

type Props = {
  className?: string;
  children: ReactNode;
  backgrounds?: { m?: string; t?: string; d?: string };
};

const Section = ({ className, children, backgrounds }: Props) => {
  const ref = useRef<HTMLElement>(null);
  const { isOnMobile, isOnTablet, isOnDesktop, isRetina } = useResponsive();

  const screen =
    (isOnMobile && "m") ||
    (isOnTablet && "t") ||
    (isOnDesktop && "d") ||
    undefined;

  useEffect(() => {
    if (backgrounds && screen && backgrounds[screen]) {
      const img = new Image();
      img.src = getCloudinaryImage(
        `${backgrounds[screen]}_${screen}_${isRetina ? "2x" : "1x"}`,
      );
      img.onload = () => {
        if (ref.current) ref.current.style.backgroundImage = `url(${img.src})`;
      };
    }
  }, [backgrounds, screen, isRetina]);

  return (
    <section ref={ref} className={className}>
      {children}
    </section>
  );
};

export default Section;
