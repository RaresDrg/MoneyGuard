import { useCurrencyData } from "../../hooks";
import { formatDate } from "../../utils";
import { LoadingSpinner } from "../../components/common";
import { CurrencyConverter } from "../../components";

type Props = {
  className?: string;
};

const CurrencyPage = ({ className: styles }: Props) => {
  const { currencyData, isLoading, hasFetchError } = useCurrencyData();

  if (isLoading || (!currencyData && !hasFetchError)) return <LoadingSpinner />;

  return (
    <div className={styles}>
      <h2>Currency Converter</h2>

      {hasFetchError || !currencyData ? (
        <p className="error animate__animated animate__flipInX">
          ❌ Our currency provider is currently unreachable. We're working on it
          — please try again later ❌
        </p>
      ) : (
        <CurrencyConverter
          rates={currencyData.rates}
          lastUpdatedDate={formatDate(
            new Date(currencyData.timestamp).toDateString()
          )}
        />
      )}
    </div>
  );
};

export default CurrencyPage;
