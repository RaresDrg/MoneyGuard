import { formatAmount } from "../../utils";
import { EllipsisTooltip, TextLoader } from "../common";
import type { Statistics } from "../../App.types";

type Props = {
  className?: string;
  statistics: Statistics | null;
  isLoading: boolean;
};

const StatisticsTable = ({ className, statistics, isLoading }: Props) => {
  const styles = `${className} animate__animated animate__fadeIn`;

  if (isLoading) {
    return <TextLoader className={styles} text="Loading..." />;
  }

  if (!statistics) {
    return (
      <p className={`${styles} fallback`}>
        There is no data available for the selected time
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
