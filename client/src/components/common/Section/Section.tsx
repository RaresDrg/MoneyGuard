import { ReactElement, useEffect, useRef } from "react";
import { useReactResponsive } from "../../../hooks";
import { getCloudinaryImage } from "../../../utils";

type Props = {
  className?: string;
  children: ReactElement;
  backgrounds?: { m?: string; t?: string; d?: string };
};

const Section = ({ className, children, backgrounds }: Props) => {
  const ref = useRef<HTMLElement>(null);
  const { isOnMobile, isOnTablet, isRetina } = useReactResponsive();
  const screen = isOnMobile ? "m" : isOnTablet ? "t" : "d";

  useEffect(() => {
    const bg = backgrounds?.[screen] ?? "gradientBg";
    if (bg !== "none") {
      const img = new Image();
      img.src = getCloudinaryImage(`${bg}_${screen}_${isRetina ? "2x" : "1x"}`);
      img.onload = () => {
        if (ref.current) ref.current.style.backgroundImage = `url(${img.src})`;
      };
    }
  }, [screen, backgrounds]);

  return (
    <section ref={ref} className={className}>
      {children}
    </section>
  );
};

export default Section;
