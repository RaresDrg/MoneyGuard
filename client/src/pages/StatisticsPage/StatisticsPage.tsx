import { useState, useEffect } from "react";
import { useAppDispatch, useTransactions } from "../../hooks";
import { getStatistics } from "../../redux/transactions/operations";
import { MONTHS, YEARS } from "../../constants";
import { Dropdown, LoadingSpinner } from "../../components/common";
import { StatisticsChart, StatisticsTable } from "../../components";

type Props = {
  className?: string;
};

const StatisticsPage = ({ className: styles }: Props) => {
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());

  const dispatch = useAppDispatch();
  const { isLoading } = useTransactions();

  useEffect(() => {
    dispatch(getStatistics({ month, year }));
  }, [month, year]);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className={styles}>
      <h2>Statistics</h2>
      <div>
        <StatisticsChart />
        <div className="dropdowns">
          <Dropdown
            options={MONTHS}
            currentOption={MONTHS[month]}
            handlerFunction={(option) => setMonth(MONTHS.indexOf(option))}
          />
          <Dropdown
            options={YEARS}
            currentOption={String(year)}
            handlerFunction={(option) => setYear(Number(option))}
          />
        </div>
        <StatisticsTable className="animate__animated animate__fadeIn" />
      </div>
    </div>
  );
};

export default StatisticsPage;
