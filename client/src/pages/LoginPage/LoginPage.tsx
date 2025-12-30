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

const LoginPage = ({ className }: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const initialValues = { email: "", loginPassword: "" };
  type Values = typeof initialValues;

  const config = Object.keys(initialValues) as Array<keyof Values>;
  const validationSchema = utils.getValidationSchema(config);

  function handleSubmit(values: Values, formikBag: FormikHelpers<Values>) {
    utils.handleRequestFlow({
      request: () =>
        authService.login({
          email: values.email,
          loginPassword: values.loginPassword,
        }),
      delay: 2500,
      loadingType: "screen",
      onSuccess: (res) => {
        dispatch(setAuthenticatedUser(res.data));
        utils.notify.success(`Welcome, ${res.data.name} !`);
      },
      onError: (error) => {
        utils.notify.error(error);
        if (error.status === 404 || error.status === 403) {
          formikBag.setFieldError("email", "Invalid email address");
          return;
        }
        if (error.response?.data?.message === "Password is wrong") {
          formikBag.setFieldError("loginPassword", "Invalid password");
          return;
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
                id="emailInput"
                name="email"
                placeholder="Email"
                icon="icon-email"
              />
              <Input
                type="password"
                id="loginPasswordInput"
                name="loginPassword"
                placeholder="Password"
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

export default LoginPage;
