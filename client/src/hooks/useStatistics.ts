import { useState } from "react";
import { transactionsService } from "../services";
import type { Statistics } from "../App.types";

const useStatistics = () => {
  const [statistics, setStatistics] = useState<null | Statistics>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchData(startDate: string, endDate: string) {
    try {
      setIsLoading(true);
      const res = await transactionsService.fetchStatistics(startDate, endDate);
      setStatistics(res.data.statistics);
    } catch {
      setStatistics(null);
    } finally {
      setIsLoading(false);
    }
  }

  return { statistics, isLoading, fetchData };
};

export default useStatistics;
