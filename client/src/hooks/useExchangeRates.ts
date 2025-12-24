import { useEffect, useState } from "react";
import { useLocalStorage } from ".";
import { exchangeRatesService } from "../services";
import { handleRequestFlow } from "../utils";

type Rates = Record<string, number>;

const useExchangeRates = () => {
  const { data, meta, updateStorage } = useLocalStorage<Rates>("exchangeRates");
  const [isLoading, setIsLoading] = useState(false);

  function fetchData() {
    setIsLoading(true);
    handleRequestFlow({
      request: () => exchangeRatesService.fetchRates(),
      delay: 500,
      onSuccess: (res) => {
        const { rates, expiresAt } = res.data;
        updateStorage(rates, { expiresAt: new Date(expiresAt).getTime() });
      },
      onFinally: () => setIsLoading(false),
    });
  }

  useEffect(() => {
    if (!data) fetchData();
  }, []);

  return { isLoading, rates: data, expiresAt: meta.expiresAt };
};

export default useExchangeRates;
