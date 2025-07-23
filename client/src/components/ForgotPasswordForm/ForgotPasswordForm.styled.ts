import styled from "styled-components";
import ForgotPasswordForm from "./ForgotPasswordForm";

const StyledForgotPasswordForm = styled(ForgotPasswordForm)`
  background: #ffffff1a;
  backdrop-filter: blur(50px);
  border: none;

  form {
    width: 100%;
    padding: 20px;

    & {
      > h2 {
        margin-bottom: 100px;
      }

      > button:nth-last-of-type(2) {
        margin-top: 100px;
        margin-bottom: 20px;
      }
    }
  }

  @media (min-width: 768px) {
    form {
      padding: 80px 62px;
    }
  }
`;

export default StyledForgotPasswordForm;
