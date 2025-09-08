import { useEffect } from "react";
import { Field, useFormikContext } from "formik";
import { Dropdown } from "..";
import { useLocalStorage, useAuth } from "../../../hooks";

type Props = {
  className?: string;
  availableCurrencies: string[];
};

const CurrencyDropdown = ({ className, availableCurrencies }: Props) => {
  const [storageData, setStorageData] = useLocalStorage<string>("currency");
  const favoriteCurrency = storageData?.payload;

  const { user } = useAuth();

  const { setFieldValue } = useFormikContext();

  useEffect(() => {
    if (favoriteCurrency) setFieldValue("currency", favoriteCurrency);
  }, [favoriteCurrency]);

  return (
    <Field name="currency">
      {() => (
        <Dropdown
          className={className}
          options={availableCurrencies}
          currentOption={favoriteCurrency ?? "Select currency"}
          handlerFunction={(selectedOption) => {
            setStorageData({
              payload: selectedOption,
              owner: user!.email,
              expiresAt: null,
            });
          }}
        />
      )}
    </Field>
  );
};

export default CurrencyDropdown;
