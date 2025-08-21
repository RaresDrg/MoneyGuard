import { StatisticsLayout } from "../../components";

type Props = {
  className?: string;
};

const StatisticsPage = ({ className: styles }: Props) => {
  return (
    <div className={styles}>
      <h2>Statistics</h2>
      <StatisticsLayout />
    </div>
  );
};

export default StatisticsPage;
