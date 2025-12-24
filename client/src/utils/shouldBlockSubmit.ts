import { FormikErrors, FormikTouched } from "formik";

export function shouldBlockSubmit<Values>(
  errors: FormikErrors<Values>,
  touched: FormikTouched<Values>
) {
  return Object.keys(errors).some(
    (key) => errors[key as keyof Values] && touched[key as keyof Values]
  );
}
