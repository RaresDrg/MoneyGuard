import { Field, useFormikContext } from "formik";
import DatePicker from "react-datepicker";
import { renderIcon } from "../../../utils";

type Props = {
  className?: string;
};

const DateField = ({ className: styles }: Props) => {
  const { values, setFieldValue } = useFormikContext<{ date: string }>();

  return (
    <div className={styles}>
      <Field name="date">
        {() => (
          <DatePicker
            selected={new Date(values.date)}
            dateFormat="dd.MM.yyyy"
            minDate={new Date(2020, 0, 1)}
            maxDate={new Date(new Date().getFullYear(), 11, 31)}
            calendarStartDay={1}
            showIcon
            icon={renderIcon("icon-date")}
            toggleCalendarOnIconClick
            onChange={(date) => setFieldValue("date", date?.toISOString())}
            onKeyDown={(e) => e.preventDefault()}
          />
        )}
      </Field>
    </div>
  );
};

export default DateField;
