import { useEffect, useState } from "react";
import { useLocalStorage } from ".";
import { currencyService } from "../services";

type DataType = { rates: Record<string, number>; timestamp: number };

const useCurrencyData = () => {
  const [currencyData, setCurrencyData] = useLocalStorage<DataType>("currency");

  const [isLoading, setIsLoading] = useState(false);
  const [hasFetchError, setHasFetchError] = useState(false);

  async function fetchData() {
    try {
      setIsLoading(true);
      const res = await currencyService.fetchRates();
      setCurrencyData(res.data);
    } catch {
      setHasFetchError(true);
    } finally {
      setIsLoading(false);
    }
  }

  function isExpired(timestamp: number) {
    const normalize = (date: Date) => date.setHours(0, 0, 0, 0);
    return normalize(new Date(timestamp)) < normalize(new Date());
  }

  useEffect(() => {
    if (!currencyData || isExpired(currencyData.timestamp)) fetchData();
  }, []);

  return { isLoading, hasFetchError, currencyData };
};

export default useCurrencyData;
