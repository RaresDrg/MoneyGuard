import styled from "styled-components";
import RegisterPage from "./RegisterPage";
import { getCloudinaryImage } from "../../utils";

const StyledRegisterPage = styled(RegisterPage)`
  & > div > form {
    width: 100%;
    padding: 20px;

    & {
      > a:nth-of-type(1),
      > a:nth-of-type(1) ~ div:nth-of-type(1),
      > a:nth-of-type(1) ~ div:nth-of-type(2),
      > a:nth-of-type(1) ~ div:nth-of-type(3),
      > a:nth-of-type(1) ~ div:nth-of-type(4) {
        margin-bottom: 40px;
      }

      > button:nth-last-of-type(1) {
        margin-top: 20px;
      }
    }
  }

  @media (min-width: 768px) {
    display: flex;
    padding: 50px;
    background-image: image-set(
      url(${getCloudinaryImage("registerBg_t_1x")}) 1x,
      url(${getCloudinaryImage("registerBg_t_2x")}) 2x
    );

    & > div > form {
      padding: 40px 62px;
    }
  }

  @media (min-width: 1280px) {
    background-image: image-set(
      url(${getCloudinaryImage("registerBg_d_1x")}) 1x,
      url(${getCloudinaryImage("registerBg_d_2x")}) 2x
    );
  }
`;

export default StyledRegisterPage;
