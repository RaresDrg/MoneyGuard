import { EllipsisTooltip } from "..";
import { useAuth } from "../../../hooks";
import { formatAmount } from "../../../utils";

type Props = {
  className?: string;
};

const Balance = ({ className: styles }: Props) => {
  const { balance } = useAuth();

  return (
    <div className={`${styles} animate__animated animate__zoomIn`}>
      <span>Your balance</span>
      <EllipsisTooltip text={formatAmount(balance)} />
    </div>
  );
};

export default Balance;
