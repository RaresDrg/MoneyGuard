import { useEffect, useState } from "react";
import { useLocalStorage } from ".";
import { exchangeRatesService } from "../services";

type Rates = Record<string, number>;

const useExchangeRates = () => {
  const [storageData, setStorageData] = useLocalStorage<Rates>("exchangeRates");

  const [isLoading, setIsLoading] = useState(false);
  const [hasFetchError, setHasFetchError] = useState(false);

  async function fetchData() {
    try {
      setIsLoading(true);
      const res = await exchangeRatesService.fetchRates();
      setStorageData({
        payload: res.data.rates,
        owner: null,
        expiresAt: new Date(res.data.expiresAt).getTime(),
      });
    } catch {
      setHasFetchError(true);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (!storageData) fetchData();
  }, []);

  return {
    isLoading,
    hasFetchError,
    rates: storageData?.payload ?? null,
    expiresAt: storageData?.expiresAt ?? null,
  };
};

export default useExchangeRates;
