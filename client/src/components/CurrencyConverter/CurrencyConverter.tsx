import { useState, useEffect } from "react";
import { useLocalStorage, useDebounce, useAnimatedNumber } from "../../hooks";
import { DECIMAL_INPUT_ALLOWED_KEYS } from "../../constants";
import { ComboBox, EllipsisTooltip, CopyButton } from "../common";
import * as utils from "../../utils";

type Props = {
  className?: string;
  rates: Record<string, number>;
  expiresAt: number;
};

const CurrencyConverter = ({ className, rates, expiresAt }: Props) => {
  const { data: favoriteCurrency, updateStorage } =
    useLocalStorage<string>("favoriteCurrency");

  const [value, setValue] = useState("");
  const amount = useDebounce(Number(value.replace(/,/g, "")), 500);

  const [result, setResult] = useState(0);
  const animatedResult = useAnimatedNumber(result);

  useEffect(() => {
    if (favoriteCurrency && amount) setResult(amount / rates[favoriteCurrency]);
    else if (result !== 0) setResult(0);
  }, [amount, favoriteCurrency, rates]);

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.ctrlKey || e.metaKey) return;
    if (!DECIMAL_INPUT_ALLOWED_KEYS.includes(e.key)) e.preventDefault();
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const rawValue = e.target.value.replace(/,/g, "");

    if (rawValue === "") {
      setValue("");
      return;
    }

    const isValidFormat = utils.validateInput(rawValue);
    if (isValidFormat) setValue(utils.formatWithCommas(rawValue));
  }

  function handlePaste(e: React.ClipboardEvent<HTMLInputElement>) {
    e.preventDefault();

    const pastedValue = e.clipboardData.getData("text");
    const cleanedValue = utils.sanitizePastedValue(pastedValue);

    const isValidFormat = utils.validateInput(cleanedValue);
    if (isValidFormat) setValue(utils.formatWithCommas(cleanedValue));
  }

  return (
    <div className={className}>
      <p className="intro">
        <span>🌍 Traveling or working with other currencies ?</span>
        <span>
          &mdash; enter the amount and select the currency to instantly see the
          equivalent value in <b>USD</b>
        </span>
      </p>
      <div className="form">
        <label className="amount">
          <input
            type="text"
            value={value}
            placeholder="0.00"
            onKeyDown={handleKeyDown}
            onChange={handleChange}
            onPaste={handlePaste}
          />
        </label>
        <ComboBox
          className="currency"
          options={Object.keys(rates)}
          handlerFunction={(selectedOption) =>
            updateStorage(selectedOption, { assignToUser: true })
          }
          currentOption={favoriteCurrency ?? undefined}
          placeholder="Select currency"
          searchEnabled
        />
        <div className="result">
          {utils.renderIcon("icon-arrow")}
          <EllipsisTooltip text={utils.formatAmount(animatedResult)} />
          {result > 0 && <CopyButton valueToCopy={result.toFixed(2)} />}
        </div>
        <p className="info">
          <span>exchange rates last updated on</span>
          <b>{utils.formatDate(expiresAt)}</b>
        </p>
      </div>
    </div>
  );
};

export default CurrencyConverter;
