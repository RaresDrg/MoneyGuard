import { useState, useEffect } from "react";
import { StatisticsChart, StatisticsTable } from "../../components";
import { Dropdown } from "../../components/common";
import { useStatistics } from "../../hooks";
import { normalizeDate } from "../../utils";
import { MONTHS, YEARS } from "../../constants";

type Props = {
  className?: string;
};

const StatisticsPage = ({ className: styles }: Props) => {
  const { statistics, isLoading, fetchData } = useStatistics();

  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const startDate = normalizeDate(new Date(year, month, 1));
    const endDate = normalizeDate(new Date(year, month + 1, 0));
    fetchData(startDate, endDate);
  }, [month, year]);

  return (
    <div className={styles}>
      <h2>Statistics</h2>
      <div>
        <StatisticsChart statistics={statistics} />
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
        <StatisticsTable statistics={statistics} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default StatisticsPage;
