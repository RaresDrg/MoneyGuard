import { useState } from "react";
import { useStatistics } from "../../hooks";
import { MONTHS, YEARS } from "../../constants";
import { normalizeDate } from "../../utils";
import { StatisticsChart, StatisticsTable } from "../../components";
import { Select } from "../../components/common";

type Props = {
  className?: string;
};

const StatisticsPage = ({ className }: Props) => {
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());

  const startDate = normalizeDate(new Date(year, month, 1));
  const endDate = normalizeDate(new Date(year, month + 1, 0));

  const { statistics, isLoading } = useStatistics(startDate, endDate);

  return (
    <div className={className}>
      <h2 className="page-title">Statistics</h2>
      <div>
        <StatisticsChart statistics={statistics} />
        <div className="filters">
          <Select
            label={MONTHS[month]}
            options={MONTHS}
            handlerFunction={(option) => setMonth(MONTHS.indexOf(option))}
          />
          <Select
            label={String(year)}
            options={YEARS}
            handlerFunction={(option) => setYear(Number(option))}
          />
        </div>

        {isLoading ? (
          <span className="text-loader">Loading...</span>
        ) : statistics ? (
          <StatisticsTable statistics={statistics} />
        ) : (
          <p className="fallback">
            There is no data available for the selected time
          </p>
        )}
      </div>
    </div>
  );
};

export default StatisticsPage;
