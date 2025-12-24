import styled from "styled-components";
import Balance from "./Balance";

const StyledBalance = styled(Balance)`
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: #523b7e99;
  backdrop-filter: blur(100px);
  box-shadow: 0px 4px 60px 0px #00000040;
  border-radius: 8px;
  padding: 11px 32px;
  animation: zoomIn 1s both;

  & {
    > span:nth-of-type(1) {
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

  @media (min-width: 768px) {
    width: 100%;
    min-width: 336px;
    max-width: fit-content;
    justify-self: end;
  }

  @media (min-width: 1280px) {
    border-radius: 0;
    max-width: 100%;
    padding: 11px 24px;
  }
`;

export default StyledBalance;
