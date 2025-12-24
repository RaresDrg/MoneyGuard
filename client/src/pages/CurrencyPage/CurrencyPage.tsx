import { useExchangeRates } from "../../hooks";
import { CurrencyConverter } from "../../components";

type Props = {
  className?: string;
};

const CurrencyPage = ({ className }: Props) => {
  const { rates, expiresAt, isLoading } = useExchangeRates();

  return (
    <div className={className}>
      <h2 className="page-title">Currency Converter</h2>

      {isLoading ? (
        <span className="text-loader">Loading...</span>
      ) : rates && expiresAt ? (
        <CurrencyConverter rates={rates} expiresAt={expiresAt} />
      ) : (
        <p className="fallback">
          ❌ Our currency provider is currently unreachable. We're working on it
          — please try again later ❌
        </p>
      )}
    </div>
  );
};

export default CurrencyPage;
