import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../../services";
import { getValidationSchema, notify } from "../../utils";
import { Form, Formik, FormikHelpers } from "formik";
import {
  FormContainer,
  FormTitle,
  Input,
  FormButton,
  LoadingSpinner,
} from "../common";

type Props = {
  className?: string;
};

const ForgotPasswordForm = ({ className: styles }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const initialValues = { email: "" };
  type Values = typeof initialValues;

  const validationSchema = getValidationSchema(["email"]);

  const handleSubmit = (values: Values, formikBag: FormikHelpers<Values>) => {
    setIsLoading(true);

    authService
      .forgotPassword(values.email)
      .then((value) => notify.success(value.message))
      .catch((error) => {
        notify.error(error);

        if (error?.response?.status === 404) {
          formikBag.setFieldError("email", "Invalid email address");
        }
      })
      .finally(() => {
        setIsLoading(false);
        formikBag.setSubmitting(false);
      });
  };

  return (
    <>
      <FormContainer className={styles}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, isValid }) => (
            <Form>
              <FormTitle text="Reset Password" />
              <Input
                type="text"
                id="emailInput"
                name="email"
                placeholder="Email"
                icon="icon-email"
              />
              <FormButton
                type="submit"
                variant="gradient"
                text="send"
                isDisabled={isSubmitting || !isValid}
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

      {isLoading && <LoadingSpinner />}
    </>
  );
};

export default ForgotPasswordForm;
