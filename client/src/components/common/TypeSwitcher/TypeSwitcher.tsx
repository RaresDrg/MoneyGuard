import { Field, useFormikContext } from "formik";

type Props = {
  className?: string;
};

const TypeSwitcher = ({ className: styles }: Props) => {
  const { values, setFieldValue } = useFormikContext<{
    type: "income" | "expense";
  }>();

  function handleChange() {
    setFieldValue("type", `${values.type === "income" ? "expense" : "income"}`);
  }

  return (
    <div className={styles}>
      <span>Income</span>
      <label>
        <Field
          type="checkbox"
          name="type"
          checked={values.type === "expense"}
          onChange={handleChange}
        />
      </label>
      <span>Expense</span>
    </div>
  );
};

export default TypeSwitcher;
