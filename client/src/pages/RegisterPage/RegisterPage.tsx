import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks";
import { setAuthenticatedUser } from "../../redux/auth/actions";
import { authService } from "../../services";
import * as utils from "../../utils";
import { Form, Formik, FormikHelpers } from "formik";
import {
  Section,
  FormContainer,
  Logo,
  Input,
  FormButton,
} from "../../components/common";

type Props = {
  className?: string;
};

const RegisterPage = ({ className }: Props) => {
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
  const validationSchema = utils.getValidationSchema(config);

  function handleSubmit(values: Values, formikBag: FormikHelpers<Values>) {
    utils.handleRequestFlow({
      request: () =>
        authService.register({
          name: utils.capitalize(values.name),
          email: values.email,
          password: values.password,
        }),
      delay: 2500,
      loadingType: "screen",
      onSuccess: (res) => {
        dispatch(setAuthenticatedUser(res.data));
        utils.notify.success(`Welcome, ${res.data.name} !`);
      },
      onError: (error) => {
        utils.notify.error(error);
        if (error.status === 409) {
          formikBag.setFieldError("email", "Invalid email address");
        }
      },
      onFinally: () => formikBag.setSubmitting(false),
    });
  }

  return (
    <Section className={className}>
      <FormContainer>
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
                  isSubmitting || utils.shouldBlockSubmit(errors, touched)
                }
              />
              <FormButton
                type="button"
                variant="white"
                text="back to home"
                handlerFunction={() => navigate("/")}
              />
            </Form>
          )}
        </Formik>
      </FormContainer>
    </Section>
  );
};

export default RegisterPage;
