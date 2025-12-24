import { formatAmount } from "../../utils";
import { EllipsisTooltip } from "../common";
import type { Statistics } from "../../App.types";

type Props = {
  className?: string;
  statistics: Statistics;
};

const StatisticsTable = ({ className, statistics }: Props) => {
  return (
    <div className={className}>
      <div className="head">
        <span>Category</span>
        <span>Sum</span>
      </div>
      {Object.entries(statistics.expense.summary).map(([category, sum]) => (
        <div key={category} className="row">
          <span>{category}</span>
          <EllipsisTooltip text={formatAmount(sum)} />
        </div>
      ))}
      <div className="total expense">
        <span>Expenses:</span>
        <EllipsisTooltip text={formatAmount(statistics.expense.total)} />
      </div>
      <div className="total income">
        <span>Income:</span>
        <EllipsisTooltip text={formatAmount(statistics.income.total)} />
      </div>
    </div>
  );
};

export default StatisticsTable;
