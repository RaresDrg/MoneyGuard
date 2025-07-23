import { useEffect, useState, useMemo } from "react";
import { useDebounce, useLocalStorage } from "../../hooks";
import { formatAmount, renderIcon } from "../../utils";
import { Dropdown, CopyButton, Tooltip } from "../common";

type Props = {
  className?: string;
  rates: Record<string, number>;
  lastUpdatedDate: string;
};

const CurrencyConverter = ({ className, rates, lastUpdatedDate }: Props) => {
  const [amount, setAmount] = useState("");
  const debouncedAmount = useDebounce(Number(amount), 500);

  const [favoriteCurrency, setFavoriteCurrency] =
    useLocalStorage<string>("favoriteCurrency");

  const [convertedAmount, setConvertedAmount] = useState(0);

  const exchangeRateInfo = useMemo(() => {
    return favoriteCurrency
      ? `1 USD = ${rates[favoriteCurrency].toFixed(4)} ${favoriteCurrency}`
      : "There is no info";
  }, [rates, favoriteCurrency]);

  useEffect(() => {
    if (debouncedAmount === 0) return setConvertedAmount(0);
    if (favoriteCurrency) {
      setConvertedAmount(debouncedAmount / rates[favoriteCurrency]);
    }
  }, [debouncedAmount, favoriteCurrency, rates]);

  return (
    <div className={className}>
      <p className="animate__animated animate__fadeInUp">
        <span>🌍 Traveling or dealing in other currencies ?</span>
        <span>
          &mdash; enter the amount and select the currency to instantly see the
          equivalent value in <b>USD</b>
        </span>
      </p>
      <div className="animate__animated animate__zoomIn">
        <input
          type="number"
          placeholder="0.00"
          value={amount}
          min="0"
          step="any"
          onChange={(e) => setAmount(e.target.value)}
          onKeyDown={(e) => {
            if (["E", "e", "-", "+"].includes(e.key)) e.preventDefault();
          }}
        />
        <Dropdown
          options={Object.keys(rates)}
          currentOption={favoriteCurrency ?? "Select currency"}
          handlerFunction={(selectedOption) =>
            setFavoriteCurrency(selectedOption)
          }
        />
        <div className="result">
          <output>
            Result : <b>{formatAmount(convertedAmount)}</b>
          </output>
          {convertedAmount > 0 && (
            <>
              <Tooltip
                content={exchangeRateInfo}
                className="info"
                label={renderIcon("icon-info")}
                placement="top-start"
              />
              <CopyButton valueToCopy={convertedAmount.toFixed(2)} />
            </>
          )}
        </div>
        <p className="exchange-info">
          <span> exchange rates last updated on</span>
          <b>{lastUpdatedDate}</b>
        </p>
      </div>
    </div>
  );
};

export default CurrencyConverter;
