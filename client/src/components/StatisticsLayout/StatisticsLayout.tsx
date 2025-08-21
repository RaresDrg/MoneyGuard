import { StatisticsChart, StatisticsTable } from "..";
import { MONTHS, YEARS } from "../../constants";
import { useStatistics } from "../../hooks";
import { Dropdown } from "../common";

type Props = {
  className?: string;
};

const StatisticsLayout = ({ className: styles }: Props) => {
  const { statistics, isLoading, month, setMonth, year, setYear } =
    useStatistics();

  return (
    <div className={styles}>
      <StatisticsChart statistics={statistics} isLoading={isLoading} />
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
  );
};

export default StatisticsLayout;
