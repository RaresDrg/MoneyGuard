import { useState, useEffect } from "react";
import { handleRequestFlow } from "../utils";
import { transactionsService } from "../services";
import type { Statistics } from "../App.types";

const useStatistics = (startDate: string, endDate: string) => {
  const [statistics, setStatistics] = useState<null | Statistics>(null);
  const [isLoading, setIsLoading] = useState(false);

  function fetchData() {
    setIsLoading(true);
    handleRequestFlow({
      request: () => transactionsService.fetchStatistics(startDate, endDate),
      delay: 500,
      onSuccess: (res) => setStatistics(res.data.statistics),
      onError: () => setStatistics(null),
      onFinally: () => setIsLoading(false),
    });
  }

  useEffect(() => {
    fetchData();
  }, [startDate, endDate]);

  return { statistics, isLoading };
};

export default useStatistics;
