import { useTransactions } from "../../hooks";
import { formatAmount } from "../../utils";
import { EllipsisTooltip } from "../common";

type Props = {
  className?: string;
};

const StatisticsTable = ({ className: styles }: Props) => {
  const { statistics } = useTransactions();

  if (!statistics) {
    return (
      <p className={`${styles} fallback`}>
        There is no data available for the selected date
      </p>
    );
  }

  return (
    <div className={styles}>
      <div className="head">
        <span>Category</span>
        <span>Sum</span>
      </div>

      {Object.entries(statistics.expense.summary).map(
        ([category, sum], index) => (
          <div key={index} className="row">
            <span>{category}</span>
            <EllipsisTooltip text={`${formatAmount(sum)}`} />
          </div>
        )
      )}

      <div className="total expense">
        <span>Expenses:</span>
        <span>{formatAmount(statistics.expense.total)}</span>
      </div>
      <div className="total income">
        <span>Income:</span>
        <span>{formatAmount(statistics.income.total)}</span>
      </div>
    </div>
  );
};

export default StatisticsTable;
