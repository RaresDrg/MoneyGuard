import styled from "styled-components";
import LogoutBtn from "./LogoutBtn";

const StyledLogoutBtn = styled(LogoutBtn)`
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--textColor);
  opacity: 0.6;
  transition: var(--transition);

  &:hover {
    opacity: 1;
  }

  & {
    svg {
      width: 18px;
      height: 18px;
      fill: currentColor;
    }

    span {
      display: none;
    }
  }

  @media (min-width: 768px) {
    & {
      span {
        display: block;
        font-weight: 400;
        font-size: 16px;
        line-height: 24px;
      }
    }
  }
`;

export default StyledLogoutBtn;
