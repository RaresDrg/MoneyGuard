import styled from "styled-components";
import LoginForm from "./LoginForm";

const StyledLoginForm = styled(LoginForm)`
  background: #ffffff1a;
  backdrop-filter: blur(50px);
  border: none;

  form {
    width: 100%;
    padding: 20px;

    & {
      > a {
        margin-bottom: 52px;
      }

      > div:has(> label):nth-of-type(1) {
        margin-bottom: 40px;
      }

      > div:has(> label + p):nth-of-type(2) {
        margin-bottom: -5px;
      }

      > div:not(:has(> label + p)):nth-of-type(2) {
        margin-bottom: 14px;
      }

      > button.forgotPassword {
        display: block;
        margin-left: auto;
        color: var(--textColor);
        font-size: 14px;
        font-weight: 600;
        opacity: 0.4;
        transition: var(--transition);

        &:hover {
          opacity: 1;
        }
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

export default StyledLoginForm;
