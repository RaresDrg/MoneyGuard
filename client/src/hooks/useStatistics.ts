import { useState, useEffect } from "react";
import { transactionsService } from "../services";
import type { Statistics } from "../App.types";
import { normalizeDate } from "../utils";

const useStatistics = () => {
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [statistics, setStatistics] = useState<null | Statistics>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchData() {
    setIsLoading(true);
    const startDate = normalizeDate(new Date(year, month, 1));
    const endDate = normalizeDate(new Date(year, month + 1, 0));

    try {
      const res = await transactionsService.fetchStatistics(startDate, endDate);
      setStatistics(res.data.statistics);
    } catch {
      setStatistics(null);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [month, year]);

  return { statistics, isLoading, month, setMonth, year, setYear };
};

export default useStatistics;
