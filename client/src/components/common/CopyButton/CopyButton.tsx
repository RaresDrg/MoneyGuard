import { useState } from "react";
import { renderIcon } from "../../../utils";
import Tippy from "@tippyjs/react";

type Props = {
  className?: string;
  valueToCopy: string;
};

const CopyButton = ({ className: styles, valueToCopy }: Props) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleClick = () => {
    navigator.clipboard.writeText(valueToCopy);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <>
      {isCopied ? (
        <span className={styles}>✅Copied!</span>
      ) : (
        <Tippy content="Copy to clipboard !" theme="material">
          <button
            type="button"
            className={styles}
            onClick={handleClick}
            aria-label="Copy to clipboard"
          >
            {renderIcon("icon-copy")}
          </button>
        </Tippy>
      )}
    </>
  );
};

export default CopyButton;
