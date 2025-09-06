import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch } from "../../hooks";
import { changePassword } from "../../redux/auth/operations";
import { getValidationSchema, notify } from "../../utils";
import { Form, Formik, FormikHelpers } from "formik";
import { FormContainer, FormTitle, Input, FormButton } from "../common";

type Props = {
  className?: string;
};

const ChangePasswordForm = ({ className: styles }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const initialValues = { password: "", confirmPassword: "" };
  type Values = typeof initialValues;

  const validationSchema = getValidationSchema(["password", "confirmPassword"]);

  const handleSubmit = (values: Values, formikBag: FormikHelpers<Values>) => {
    const validationToken = searchParams.get("validationToken")!;

    dispatch(changePassword({ validationToken, password: values.password }))
      .unwrap()
      .then((value) => notify.success(value.message))
      .catch((error) => {
        if (error?.status === 403 || error?.status === 404) {
          notify.warning("The reset link is expired. Please request a new one");
          setSearchParams({});
          return;
        }

        notify.error(error);
      })
      .finally(() => formikBag.setSubmitting(false));
  };

  return (
    <FormContainer className={styles}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form>
            <FormTitle text="Change Password" />
            <Input
              type="password"
              id="passwordInput"
              name="password"
              placeholder="Password"
            />
            <Input
              type="password"
              id="confirmPasswordInput"
              name="confirmPassword"
              placeholder="Confirm password"
            />
            <FormButton
              type="submit"
              variant="gradient"
              text="send"
              isDisabled={
                !!(
                  isSubmitting ||
                  (errors.password && touched.password) ||
                  (errors.confirmPassword && touched.confirmPassword)
                )
              }
            />
            <FormButton
              type="button"
              variant="white"
              text="go back"
              handlerFunction={() => navigate("/")}
            />
          </Form>
        )}
      </Formik>
    </FormContainer>
  );
};

export default ChangePasswordForm;
