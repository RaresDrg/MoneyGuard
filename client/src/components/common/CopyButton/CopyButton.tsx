import { useState } from "react";
import Tippy from "@tippyjs/react";
import { Icon } from "..";

type Props = {
  className?: string;
  valueToCopy: string;
};

const CopyButton = ({ className, valueToCopy }: Props) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [content, setContent] = useState("Copy to clipboard !");

  function handleClick() {
    navigator.clipboard.writeText(valueToCopy);
    setIsCopied(true);
    setContent("Copied !");

    setTimeout(() => {
      setIsCopied(false);
      setIsTooltipVisible(false);
      setTimeout(() => setContent("Copy to clipboard !"), 200);
    }, 1000);
  }

  return (
    <Tippy
      content={content}
      theme="material"
      visible={isTooltipVisible || isCopied}
      placement="top"
      offset={[0, 20]}
    >
      <button
        type="button"
        aria-label={content}
        className={className}
        disabled={isCopied}
        onMouseEnter={() => setIsTooltipVisible(true)}
        onMouseLeave={() => setIsTooltipVisible(false)}
        onFocus={() => setIsTooltipVisible(true)}
        onBlur={() => setIsTooltipVisible(false)}
        onClick={handleClick}
      >
        <Icon name={isCopied ? "icon-checkmark" : "icon-copy"} />
      </button>
    </Tippy>
  );
};

export default CopyButton;
