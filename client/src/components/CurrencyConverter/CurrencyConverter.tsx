import { Input, CurrencyDropdown, ConversionResult } from "../common";
import { Formik, Form } from "formik";
import { formatDate } from "../../utils";

type Props = {
  className?: string;
  rates: Record<string, number>;
  expiresAt: number;
};

const CurrencyConverter = ({ className, rates, expiresAt }: Props) => {
  return (
    <div className={className}>
      <Formik initialValues={{ amount: "", currency: "" }} onSubmit={() => {}}>
        {() => (
          <Form className="animate__animated animate__zoomIn">
            <h3>🌍 Traveling or dealing in other currencies ?</h3>
            <p className="intro">
              &mdash; enter the amount and select the currency to instantly see
              the equivalent value in <b>USD</b>
            </p>
            <Input
              type="decimalInput"
              id="amountInput"
              name="amount"
              placeholder="0.00"
            />
            <CurrencyDropdown availableCurrencies={Object.keys(rates)} />
            <ConversionResult rates={rates} />
            <p className="update-info">
              <span>exchange rates last updated on</span>
              <b>{formatDate(expiresAt)}</b>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CurrencyConverter;
