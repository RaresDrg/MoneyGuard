import { useState } from "react";
import { renderIcon } from "../../../utils";
import Tippy from "@tippyjs/react";

type Props = {
  className?: string;
  valueToCopy: string;
};

const CopyButton = ({ className, valueToCopy }: Props) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    navigator.clipboard.writeText(valueToCopy);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1000);
  };

  const content = isCopied ? "Copied !" : "Copy to clipboard !";

  return (
    <Tippy
      content={content}
      theme="material"
      visible={isHovered || isCopied}
      placement="top"
      offset={[0, 20]}
    >
      <button
        type="button"
        aria-label={content}
        className={className}
        disabled={isCopied}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
      >
        {renderIcon(isCopied ? "icon-checkmark" : "icon-copy")}
      </button>
    </Tippy>
  );
};

export default CopyButton;
