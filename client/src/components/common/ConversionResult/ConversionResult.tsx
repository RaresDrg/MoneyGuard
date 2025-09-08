import { useEffect, useState } from "react";
import { useFormikContext } from "formik";
import { useAnimatedNumber, useDebounce } from "../../../hooks";
import { renderIcon, formatAmount } from "../../../utils";
import { CopyButton, EllipsisTooltip } from "..";

type Props = {
  className?: string;
  rates: Record<string, number>;
};

const ConversionResult = ({ className, rates }: Props) => {
  const [result, setResult] = useState(0);
  const animatedResult = useAnimatedNumber(result);

  const { values } = useFormikContext<{ amount: string; currency: string }>();
  const amount = useDebounce(Number(values.amount), 500);
  const currency = values.currency;

  useEffect(() => {
    if (amount && currency) return setResult(amount / rates[currency]);
    if (result !== 0) setResult(0);
  }, [amount, currency]);

  if (result === 0) return null;

  return (
    <div className={`${className} animate__animated animate__flipInX`}>
      {renderIcon("icon-arrow")}
      <EllipsisTooltip text={formatAmount(animatedResult)} />
      <CopyButton valueToCopy={animatedResult.toFixed(2)} />
    </div>
  );
};

export default ConversionResult;
