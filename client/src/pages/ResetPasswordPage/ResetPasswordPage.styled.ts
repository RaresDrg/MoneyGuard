import styled from "styled-components";
import ResetPasswordPage from "./ResetPasswordPage";

const StyledResetPasswordPage = styled(ResetPasswordPage)`
  & > div > form {
    width: 100%;
    padding: 20px;

    & {
      .form-title {
        margin-bottom: 62px;
      }

      .form-title + div:nth-of-type(1) {
        margin-bottom: 40px;
      }

      > button:nth-last-of-type(2) {
        margin-top: 62px;
        margin-bottom: 20px;
      }
    }
  }

  @media (min-width: 768px) {
    display: flex;
    padding: 50px;

    & > div > form {
      padding: 62px;
    }
  }
`;

export default StyledResetPasswordPage;
