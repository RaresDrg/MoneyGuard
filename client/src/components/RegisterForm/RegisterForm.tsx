import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks";
import { register } from "../../redux/auth/operations";
import { getValidationSchema, capitalize, notify } from "../../utils";
import { Form, Formik, FormikHelpers } from "formik";
import { FormContainer, Logo, Input, FormButton } from "../common";

type Props = {
  className?: string;
};

const RegisterForm = ({ className: styles }: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  type Values = typeof initialValues;

  const config = Object.keys(initialValues) as Array<keyof Values>;
  const validationSchema = getValidationSchema(config);

  const handleSubmit = (values: Values, formikBag: FormikHelpers<Values>) => {
    const { email, password } = values;
    const name = capitalize(values.name);

    dispatch(register({ name, email, password }))
      .unwrap()
      .then(() => notify.success(`Welcome, ${name} !`))
      .catch((error) => {
        notify.error(error);

        if (error?.response?.status === 409) {
          formikBag.setFieldError("email", "Invalid email address");
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
        {({ isSubmitting, errors, touched }) => (
          <Form>
            <Logo />
            <Input
              type="text"
              id="nameInput"
              name="name"
              placeholder="Name"
              icon="icon-name"
              maxLength={51}
            />
            <Input
              type="text"
              id="emailInput"
              name="email"
              placeholder="Email"
              icon="icon-email"
            />
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
              text="register"
              isDisabled={
                !!(
                  isSubmitting ||
                  (errors.name && touched.name) ||
                  (errors.email && touched.email) ||
                  (errors.password && touched.password) ||
                  (errors.confirmPassword && touched.confirmPassword)
                )
              }
            />
            <FormButton
              type="button"
              variant="white"
              text="log in"
              handlerFunction={() => navigate("/")}
            />
          </Form>
        )}
      </Formik>
    </FormContainer>
  );
};

export default RegisterForm;
