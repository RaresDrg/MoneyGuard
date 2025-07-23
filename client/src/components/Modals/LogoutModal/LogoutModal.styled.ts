import styled from "styled-components";
import LogoutModal from "./LogoutModal";

const StyledLogoutModal = styled(LogoutModal)`
  & > div {
    padding: 20px;

    > p {
      font-weight: 400;
      font-size: 18px;
      line-height: 27px;
      text-align: center;
      color: var(--textColor);
      margin-bottom: 40px;
    }

    > button:nth-of-type(1) {
      margin-bottom: 20px;
    }
  }

  @media (min-width: 768px) {
    & > div {
      padding: 60px;

      > p {
        margin-top: 52px;
        margin-bottom: 52px;
      }
    }
  }
`;

export default StyledLogoutModal;
