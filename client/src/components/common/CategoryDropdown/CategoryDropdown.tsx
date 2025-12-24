import { Field, useFormikContext, ErrorMessage } from "formik";
import { useCategories } from "../../../hooks";
import { ComboBox } from "..";

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
          <ComboBox
            options={expenseCategories}
            handlerFunction={(option) => setFieldValue("category", option)}
            currentOption={values.category}
            placeholder="Select category"
          />
        )}
      </Field>
      <ErrorMessage className="error" name="category" component="p" />
    </div>
  );
};

export default CategoryDropdown;
