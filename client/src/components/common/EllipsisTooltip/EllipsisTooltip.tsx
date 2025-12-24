import { useRef, useState } from "react";
import Tippy from "@tippyjs/react";

type Props = {
  className?: string;
  text: string;
};

const EllipsisTooltip = ({ className, text }: Props) => {
  const [isTooltipShown, setIsTooltipShown] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  function handleShowTooltip() {
    if (ref.current && ref.current.scrollWidth > ref.current.clientWidth) {
      setIsTooltipShown(true);
    }
  }

  function handleHideTooltip() {
    if (isTooltipShown) setIsTooltipShown(false);
  }

  return (
    <Tippy content={text} visible={isTooltipShown} theme="material">
      <span
        ref={ref}
        className={className}
        onMouseEnter={handleShowTooltip}
        onMouseLeave={handleHideTooltip}
      >
        {text}
      </span>
    </Tippy>
  );
};

export default EllipsisTooltip;
