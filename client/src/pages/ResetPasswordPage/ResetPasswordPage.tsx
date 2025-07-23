import { Section } from "../../components/common";
import { ForgotPasswordForm, ChangePasswordForm } from "../../components";
import { useSearchParams } from "react-router-dom";

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const validationToken = searchParams.get("validationToken");

  return (
    <Section variant="gradientBg">
      {!validationToken ? <ForgotPasswordForm /> : <ChangePasswordForm />}
    </Section>
  );
};

export default ResetPasswordPage;
