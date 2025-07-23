import styled from "styled-components";
import Balance from "./Balance";

const StyledBalance = styled(Balance)`
  background: #523b7e99;
  backdrop-filter: blur(100px);
  box-shadow: 0px 4px 60px 0px #00000040;
  border-radius: 8px;
  padding: 11px 32px;

  & {
    > span:nth-of-type(1) {
      display: block;
      margin-bottom: 12px;
      font-weight: 400;
      font-size: 12px;
      line-height: 13px;
      color: var(--textColor);
      opacity: 0.5;
      text-transform: uppercase;
    }

    > span:nth-of-type(2) {
      font-weight: 700;
      font-size: 30px;
      line-height: 36px;
      color: var(--textColor);

      &::first-letter {
        font-weight: 400;
      }
    }
  }
`;

export default StyledBalance;
