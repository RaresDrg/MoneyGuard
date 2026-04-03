import { Field, useFormikContext, ErrorMessage } from "formik";
import { useCategories } from "../../../hooks";
import { Select } from "..";

type Props = {
  className?: string;
};

const CategoryDropdown = ({ className }: Props) => {
  const { expenseCategories } = useCategories();
  const { values, setFieldValue } = useFormikContext<{ category: string }>();

  return (
    <div className={className}>
      <Field name="category">
        {() => (
          <Select
            label={values.category || "Select category"}
            options={expenseCategories}
            handlerFunction={(option) => setFieldValue("category", option)}
          />
        )}
      </Field>
      <ErrorMessage className="error" name="category" component="p" />
    </div>
  );
};

export default CategoryDropdown;
