import { Field, useFormikContext, ErrorMessage } from "formik";
import { useCategories } from "../../../hooks";
import { Dropdown } from "..";

type Props = {
  className?: string;
};

const CategoryDropdown = ({ className }: Props) => {
  const { expenseCategories } = useCategories();

  const { values, errors, touched, setFieldValue } = useFormikContext<{
    category: string;
  }>();

  const styles = `${className} ${
    errors.category && touched.category ? "onError" : ""
  }`;

  return (
    <div className={styles}>
      <Field name="category">
        {() => (
          <Dropdown
            options={expenseCategories}
            currentOption={values.category || "Select a category"}
            handlerFunction={(selectedOption) =>
              setFieldValue("category", selectedOption)
            }
          />
        )}
      </Field>
      <ErrorMessage className="error" name="category" component="p" />
    </div>
  );
};

export default CategoryDropdown;
