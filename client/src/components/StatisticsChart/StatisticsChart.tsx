import { useTransactions } from "../../hooks";
import { EXPENSE_BACKGROUNDS } from "../../constants";
import { formatAmount } from "../../utils";
import { EllipsisTooltip } from "../common";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";

type Props = {
  className?: string;
};

const StatisticsChart = ({ className: styles }: Props) => {
  const { statistics } = useTransactions();
  const hasExpenseData = !!(statistics && statistics.expense.total > 0);

  const data = {
    labels: hasExpenseData
      ? Object.keys(statistics.expense.summary)
      : ["No expenses recorded for the selected date"],
    datasets: [
      {
        data: hasExpenseData
          ? Object.values(statistics.expense.summary)
          : [0.0001],
        backgroundColor: hasExpenseData ? EXPENSE_BACKGROUNDS : ["grey"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: "70%",
    plugins: { legend: { display: false } },
  };

  return (
    <div className={styles}>
      <Doughnut data={data} options={options} />
      <EllipsisTooltip text={formatAmount(statistics?.balance ?? 0)} />
    </div>
  );
};

export default StatisticsChart;
