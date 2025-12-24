import styled from "styled-components";
import Footer from "./Footer";

const StyledFooter = styled(Footer)`
  min-width: 320px;
  height: 60px;
  flex-shrink: 0;
  background: linear-gradient(270.02deg, #2e1746 3.2%, #2e225f 99.98%);
  box-shadow: 0px -4px 40px 0px #00000040, 0px 3px 2px 0px #0000001a inset;
  animation: fadeIn 1s both;

  & > div {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1px;

    & {
      > span {
        font-weight: 400;
        font-size: 14px;
        line-height: 21px;
        color: var(--textColor);
      }

      > span:nth-of-type(1) {
        opacity: 0.6;
        font-style: italic;
      }

      > span:nth-of-type(2) {
        opacity: 0.8;
      }
    }
  }

  @media (min-width: 768px) {
    height: 50px;

    & > div {
      flex-direction: row;

      & {
        > span {
          font-size: 16px;
          line-height: 24px;
        }

        > span:nth-of-type(1)::after {
          content: "—";
          margin: 0 6px;
        }
      }
    }
  }
`;

export default StyledFooter;
