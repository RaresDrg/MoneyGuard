import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks";
import { login } from "../../redux/auth/operations";
import { getValidationSchema, notify } from "../../utils";
import { Form, Formik, FormikHelpers } from "formik";
import { FormContainer, Logo, Input, FormButton } from "../common";

type Props = {
  className?: string;
};

const LoginForm = ({ className: styles }: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const initialValues = { email: "", loginPassword: "" };
  type Values = typeof initialValues;

  const validationSchema = getValidationSchema(["email", "loginPassword"]);

  const handleSubmit = (values: Values, formikBag: FormikHelpers<Values>) => {
    const { email, loginPassword } = values;

    dispatch(login({ email, loginPassword }))
      .unwrap()
      .then((value) => notify.success(`Welcome, ${value.data.user.name} !`))
      .catch((error) => {
        notify.error(error);

        if (error?.status === 404) {
          return formikBag.setFieldError("email", "Invalid email address");
        }
        if (error?.status === 400) {
          return formikBag.setFieldError("loginPassword", "Invalid password");
        }
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
        {({ errors, values, touched, isSubmitting }) => (
          <Form>
            <Logo />
            <Input
              type="text"
              id="emailInput"
              name="email"
              placeholder="Email"
              hasErrors={!!(errors.email && touched.email)}
              icon="icon-email"
            />
            <Input
              type="password"
              id="loginPasswordInput"
              name="loginPassword"
              placeholder="Password"
              hasErrors={!!(errors.loginPassword && touched.loginPassword)}
              values={values.loginPassword}
              icon="icon-password"
            />
            <button
              type="button"
              className="forgotPassword"
              onClick={() => navigate("/reset-password")}
            >
              Forgot password ?
            </button>
            <FormButton
              type="submit"
              variant="gradient"
              text="log in"
              isDisabled={
                !!(
                  isSubmitting ||
                  (errors.email && touched.email) ||
                  (errors.loginPassword && touched.loginPassword)
                )
              }
            />
            <FormButton
              type="button"
              variant="white"
              text="register"
              handlerFunction={() => navigate("/register")}
            />
          </Form>
        )}
      </Formik>
    </FormContainer>
  );
};

export default LoginForm;
