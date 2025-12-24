import styled from "styled-components";
import LoginPage from "./LoginPage";
import { getCloudinaryImage } from "../../utils";

const StyledLoginPage = styled(LoginPage)`
  & > div > form {
    width: 100%;
    padding: 20px;

    & {
      > a:nth-of-type(1) {
        margin-bottom: 52px;
      }

      > a:nth-of-type(1) ~ div:nth-of-type(1) {
        margin-bottom: 40px;
      }

      > a:nth-of-type(1) ~ div:nth-of-type(2) {
        margin-bottom: 14px;
      }

      button.forgotPassword {
        display: block;
        margin-left: auto;
        color: var(--textColor);
        font-weight: 600;
        font-size: 14px;
        line-height: 21px;
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
    display: flex;
    padding: 50px;
    background-image: image-set(
      url(${getCloudinaryImage("loginBg_t_1x")}) 1x,
      url(${getCloudinaryImage("loginBg_t_2x")}) 2x
    );

    & > div > form {
      padding: 80px 62px;
    }
  }

  @media (min-width: 1280px) {
    background-image: image-set(
      url(${getCloudinaryImage("loginBg_d_1x")}) 1x,
      url(${getCloudinaryImage("loginBg_d_2x")}) 2x
    );
  }
`;

export default StyledLoginPage;
