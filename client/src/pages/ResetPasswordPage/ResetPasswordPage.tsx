import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch } from "../../hooks";
import { setAuthenticatedUser } from "../../redux/auth/actions";
import { authService } from "../../services";
import * as utils from "../../utils";
import { Form, Formik, FormikHelpers } from "formik";
import {
  Section,
  FormContainer,
  Input,
  FormButton,
} from "../../components/common";

type Props = {
  className?: string;
};

const ResetPasswordPage = ({ className }: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { forgotPassword, changePassword } = authService;

  const [searchParams, setSearchParams] = useSearchParams();
  const validationToken = searchParams.get("validationToken");

  const initialValues = !validationToken
    ? { email: "" }
    : { password: "", confirmPassword: "" };
  type Values = typeof initialValues;

  const config = Object.keys(initialValues) as Array<keyof Values>;
  const validationSchema = utils.getValidationSchema(config);

  function handleSubmit(values: Values, formikBag: FormikHelpers<Values>) {
    utils.handleRequestFlow({
      request: !validationToken
        ? () => forgotPassword(values.email!)
        : () => changePassword({ password: values.password!, validationToken }),
      delay: !validationToken ? 1000 : 2500,
      loadingType: !validationToken ? "spinner" : "screen",
      onSuccess: !validationToken
        ? (res) => utils.notify.success(res.message)
        : (res) => {
            dispatch(setAuthenticatedUser(res.data));
            utils.notify.success(res.message);
          },
      onError: !validationToken
        ? (error) => {
            utils.notify.error(error);
            if (error.status === 404 || error.status === 403) {
              formikBag.setFieldError("email", "Invalid email address");
            }
          }
        : (error) => {
            if (error.status === 404) {
              const msg = "The reset link is expired. Please request a new one";
              utils.notify.warning(msg);
              searchParams.delete("validationToken");
              setSearchParams(searchParams);
              return;
            }
            utils.notify.error(error);
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
              <h2 className="form-title">
                {!validationToken ? "Reset Password" : "Change Password"}
              </h2>
              {!validationToken ? (
                <Input
                  type="text"
                  id="emailInput"
                  name="email"
                  placeholder="Email"
                  icon="icon-email"
                />
              ) : (
                <>
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
                </>
              )}
              <FormButton
                type="submit"
                variant="gradient"
                text="send"
                isDisabled={
                  isSubmitting || utils.shouldBlockSubmit(errors, touched)
                }
              />
              <FormButton
                type="button"
                variant="white"
                text="back to login"
                handlerFunction={() => navigate("/login")}
              />
            </Form>
          )}
        </Formik>
      </FormContainer>
    </Section>
  );
};

export default ResetPasswordPage;
