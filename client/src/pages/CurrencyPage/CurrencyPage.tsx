import { useExchangeRates } from "../../hooks";
import { TextLoader } from "../../components/common";
import { CurrencyConverter } from "../../components";

type Props = {
  className?: string;
};

const CurrencyPage = ({ className: styles }: Props) => {
  const { rates, expiresAt, isLoading, hasFetchError } = useExchangeRates();
  const showFallback = (hasFetchError || !rates) && !isLoading;
  const showConverter = rates && expiresAt && !isLoading;

  return (
    <div className={styles}>
      <h2>Currency Converter</h2>
      {isLoading && <TextLoader text="Loading..." />}
      {showFallback && (
        <p className="fallback animate__animated animate__fadeInUp">
          ❌ Our currency provider is currently unreachable. We're working on it
          — please try again later ❌
        </p>
      )}
      {showConverter && (
        <CurrencyConverter rates={rates} expiresAt={expiresAt} />
      )}
    </div>
  );
};

export default CurrencyPage;
