import { EllipsisTooltip } from "..";
import { useReduxState, useAnimatedNumber } from "../../../hooks";
import { formatAmount } from "../../../utils";

type Props = {
  className?: string;
};

const Balance = ({ className }: Props) => {
  const balance = useReduxState("selectUserBalance");
  const animatedBalance = useAnimatedNumber(balance);

  return (
    <div className={className}>
      <span>Your balance</span>
      <EllipsisTooltip text={formatAmount(animatedBalance)} />
    </div>
  );
};

export default Balance;
