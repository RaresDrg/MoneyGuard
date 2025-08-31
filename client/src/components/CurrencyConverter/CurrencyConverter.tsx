import { useState } from "react";
import { CopyButton, Dropdown, EllipsisTooltip } from "../common";
import { formatAmount, formatDate, renderIcon } from "../../utils";
import {
  useLocalStorage,
  useAuth,
  useEffectAfterMount,
  useDebounce,
} from "../../hooks";

type Props = {
  className?: string;
  rates: Record<string, number>;
  expiresAt: number;
};

const CurrencyConverter = ({ className, rates, expiresAt }: Props) => {
  const [inputError, setInputError] = useState<null | string>(null);
  const [amount, setAmount] = useState("");
  const debouncedAmount = useDebounce(Number(amount), 500);

  const [storageData, setStorageData] = useLocalStorage<string>("currency");
  const favoriteCurrency = storageData?.payload;
  const { user } = useAuth();

  const [convertedAmount, setConvertedAmount] = useState(0);

  useEffectAfterMount(() => {
    if (debouncedAmount && favoriteCurrency) {
      setConvertedAmount(debouncedAmount / rates[favoriteCurrency]);
      return;
    }
    if (convertedAmount !== 0) setConvertedAmount(0);
  }, [debouncedAmount, favoriteCurrency, rates]);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (Number(e.target.value) < 100_000_000_000) {
      setAmount(e.target.value);
      if (inputError) setInputError(null);
    } else {
      setInputError("Amount is too much");
    }
  }

  return (
    <div className={className}>
      <div className="form animate__animated animate__zoomIn">
        <h3>🌍 Traveling or dealing in other currencies ?</h3>
        <p>
          &mdash; enter the amount and select the currency to instantly see the
          equivalent value in <b>USD</b>
        </p>
        <div className="input-field">
          <input
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={handleInputChange}
            onWheel={(e) => e.currentTarget.blur()}
            onKeyDown={(e) => {
              if (["E", "e", "-", "+"].includes(e.key)) e.preventDefault();
            }}
          />
          {inputError && <p className="error">{inputError}</p>}
        </div>
        <Dropdown
          options={Object.keys(rates)}
          currentOption={favoriteCurrency ?? "Select currency"}
          handlerFunction={(selectedOption) =>
            setStorageData({
              payload: selectedOption,
              owner: user!.email,
              expiresAt: null,
            })
          }
        />
        {!inputError && convertedAmount !== 0 && (
          <div className="result animate__animated animate__flipInX">
            {renderIcon("icon-arrow")}
            <EllipsisTooltip text={formatAmount(convertedAmount)} />
            <CopyButton valueToCopy={convertedAmount.toFixed(2)} />
          </div>
        )}
        <p className="update-info">
          <span>exchange rates last updated on</span>
          <b>{formatDate(expiresAt)}</b>
        </p>
      </div>
    </div>
  );
};

export default CurrencyConverter;
