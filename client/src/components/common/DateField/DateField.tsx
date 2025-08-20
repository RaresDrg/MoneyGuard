import { Field, useFormikContext } from "formik";
import DatePicker from "react-datepicker";
import { normalizeDate, renderIcon } from "../../../utils";
import { CURRENT_YEAR, MIN_YEAR } from "../../../constants";

type Props = {
  className?: string;
};

const DateField = ({ className: styles }: Props) => {
  const { values, setFieldValue } = useFormikContext<{ date: string }>();

  function handleChange(date: Date) {
    const normalizedDate = normalizeDate(date);
    setFieldValue("date", normalizedDate);
  }

  return (
    <div className={styles}>
      <Field name="date">
        {() => (
          <DatePicker
            selected={new Date(values.date)}
            dateFormat="dd.MM.yyyy"
            minDate={new Date(MIN_YEAR, 0, 1)}
            maxDate={new Date(CURRENT_YEAR, 11, 31)}
            calendarStartDay={1}
            showIcon
            icon={renderIcon("icon-date")}
            toggleCalendarOnIconClick
            onChange={(date) => handleChange(date!)}
            onKeyDown={(e) => e.preventDefault()}
          />
        )}
      </Field>
    </div>
  );
};

export default DateField;
