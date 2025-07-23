import { ReactNode } from "react";
import Tippy from "@tippyjs/react";
import { Placement } from "@popperjs/core";

type Props = {
  className?: string;
  content: string;
  label: ReactNode;
  placement?: Placement;
};

const Tooltip = ({ className, content, label, placement = "top" }: Props) => {
  return (
    <Tippy content={content} theme="material" placement={placement}>
      <span className={className}>{label}</span>
    </Tippy>
  );
};

export default Tooltip;
