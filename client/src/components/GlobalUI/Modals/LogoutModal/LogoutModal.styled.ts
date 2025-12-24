import styled from "styled-components";
import LogoutModal from "./LogoutModal";

const StyledLogoutModal = styled(LogoutModal)`
  & > div {
    padding: 20px;
    background: #4a3670;

    > p {
      font-weight: 400;
      font-size: 18px;
      line-height: 27px;
      text-align: center;
      color: var(--textColor);
      margin: 52px 0 40px 0;
    }

    > button:nth-of-type(1) {
      margin-bottom: 20px;
    }
  }

  @media (min-width: 768px) {
    & > div {
      padding: 60px;
      border: 0.5px solid #ffffff4d;

      > p {
        font-size: 20px;
        line-height: 30px;
        margin: 52px 0;
      }
    }
  }
`;

export default StyledLogoutModal;
