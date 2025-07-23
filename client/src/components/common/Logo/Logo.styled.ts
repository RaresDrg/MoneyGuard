import styled from "styled-components";
import Logo from "./Logo";

const StyledLogo = styled(Logo)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content;
  margin: 0 auto;

  & {
    svg {
      width: 25.5px;
      height: 25.5px;
    }

    span {
      color: var(--textColor);
      font-weight: 400;
      font-size: 19.11px;
      line-height: 28.86px;
    }
  }

  @media (min-width: 768px) {
    & {
      svg {
        width: 36px;
        height: 36px;
      }

      span {
        font-size: 27px;
        line-height: 40px;
      }
    }
  }
`;

export default StyledLogo;
