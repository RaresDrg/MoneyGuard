import { useRef, useState } from "react";
import Tippy from "@tippyjs/react";

type Props = {
  className?: string;
  text: string;
};

const EllipsisTooltip = ({ className: styles, text }: Props) => {
  const [isTooltipShown, setIsTooltipShown] = useState(false);
  const spanRef = useRef<HTMLSpanElement>(null);

  function handleShowTooltip() {
    const { current } = spanRef;

    if (current && current.scrollWidth > current.clientWidth) {
      setIsTooltipShown(true);
    }
  }

  function handleHideTooltip() {
    if (isTooltipShown) setIsTooltipShown(false);
  }

  return (
    <Tippy content={text} visible={isTooltipShown} theme="material">
      <span
        ref={spanRef}
        className={styles}
        onMouseEnter={handleShowTooltip}
        onMouseLeave={handleHideTooltip}
      >
        {text}
      </span>
    </Tippy>
  );
};

export default EllipsisTooltip;
