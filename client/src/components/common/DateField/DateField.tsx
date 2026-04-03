import { Field, useFormikContext } from "formik";
import DatePicker from "react-datepicker";
import { Icon } from "..";
import { normalizeDate } from "../../../utils";
import { CURRENT_YEAR, MIN_YEAR } from "../../../constants";

type Props = {
  className?: string;
};

const DateField = ({ className }: Props) => {
  const { values, setFieldValue } = useFormikContext<{ date: string }>();

  function handleKeyDown(e: React.KeyboardEvent) {
    e.stopPropagation();
    if (e.key !== "Tab") e.preventDefault();
  }

  return (
    <div className={className}>
      <Field name="date">
        {() => (
          <DatePicker
            selected={new Date(values.date)}
            dateFormat="dd.MM.yyyy"
            minDate={new Date(MIN_YEAR, 0, 1)}
            maxDate={new Date(CURRENT_YEAR, 11, 31)}
            calendarStartDay={1}
            showIcon
            icon={<Icon name="icon-date" />}
            onKeyDown={handleKeyDown}
            onChange={(date) => setFieldValue("date", normalizeDate(date!))}
            aria-label="Select transaction date"
          />
        )}
      </Field>
    </div>
  );
};

export default DateField;
