import styled from "styled-components";
import ChangePasswordForm from "./ChangePasswordForm";

const StyledChangePasswordForm = styled(ChangePasswordForm)`
  background: #ffffff1a;
  backdrop-filter: blur(50px);
  border: none;

  form {
    width: 100%;
    padding: 20px;

    & {
      > h2 {
        margin-bottom: 52px;
      }

      > div:has(> label):nth-of-type(1) {
        margin-bottom: 40px;
      }

      > button:nth-last-of-type(2) {
        margin-top: 52px;
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

export default StyledChangePasswordForm;
