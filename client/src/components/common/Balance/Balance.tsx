import { EllipsisTooltip } from "..";
import { useAuth, useAnimatedNumber } from "../../../hooks";
import { formatAmount } from "../../../utils";

type Props = {
  className?: string;
};

const Balance = ({ className: styles }: Props) => {
  const { balance } = useAuth();
  const animatedBalance = useAnimatedNumber(balance);

  return (
    <div className={`${styles} animate__animated animate__zoomIn`}>
      <span>Your balance</span>
      <EllipsisTooltip text={formatAmount(animatedBalance)} />
    </div>
  );
};

export default Balance;
