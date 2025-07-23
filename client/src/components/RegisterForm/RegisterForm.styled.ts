import styled from "styled-components";
import RegisterForm from "./RegisterForm";

const StyledRegisterForm = styled(RegisterForm)`
  background: #ffffff1a;
  backdrop-filter: blur(50px);
  border: none;

  form {
    width: 100%;
    padding: 20px;

    & {
      > a {
        margin-bottom: 40px;
      }

      > div:has(> label) {
        margin-bottom: 40px;
      }

      > button:nth-last-of-type(1) {
        margin-top: 20px;
      }
    }
  }

  @media (min-width: 768px) {
    form {
      padding: 40px 62px;
    }
  }
`;

export default StyledRegisterForm;
