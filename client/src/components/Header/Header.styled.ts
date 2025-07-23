import styled from "styled-components";
import Header from "./Header";

const StyledHeader = styled(Header)`
  height: 60px;
  min-width: 320px;
  background: linear-gradient(270.02deg, #2e1746 3.2%, #2e225f 99.98%);
  box-shadow: 0px 4px 40px 0px #00000040, 0px -3px 2px 0px #0000001a inset;

  & {
    > div {
      height: 100%;
      display: flex;
      align-items: center;

      & {
        > a {
          margin: 0;

          & {
            svg {
              width: 17.11px;
              height: 17.11px;
            }
            span {
              line-height: 19.39px;
              font-size: 12.84px;
            }
          }
        }

        > span.username {
          font-weight: 400;
          font-size: 16px;
          line-height: 24px;
          color: var(--textColor);
          opacity: 0.6;
          margin-left: auto;
          max-width: calc(100% - 200px);
        }

        > span.separator {
          display: block;
          width: 1px;
          height: 30px;
          background-color: var(--textColor);
          opacity: 0.6;
          margin-left: 12px;
          margin-right: 12px;
        }
      }
    }
  }

  @media (min-width: 768px) {
    height: 80px;

    & > div > a {
      & {
        svg {
          width: 23.49px;
          height: 23.49px;
        }
        span {
          line-height: 26px;
          font-size: 17.1px;
        }
      }
    }
  }
`;

export default StyledHeader;
