import styled from "styled-components";
import Header from "./Header";

const StyledHeader = styled(Header)`
  min-width: 320px;
  height: 60px;
  flex-shrink: 0;
  background: linear-gradient(270.02deg, #2e1746 3.2%, #2e225f 99.98%);
  box-shadow: 0px 4px 40px 0px #00000040, 0px -3px 2px 0px #0000001a inset;
  animation: fadeIn 1s both;

  & > div {
    height: 100%;
    display: flex;
    align-items: center;

    & {
      > a:nth-of-type(1) {
        margin: 0 50px 0 0;
        flex-shrink: 0;

        & {
          svg {
            width: 17.11px;
            height: 17.11px;
          }
          span {
            font-size: 12.84px;
            line-height: 19.39px;
          }
        }
      }

      .username {
        font-weight: 400;
        font-size: 16px;
        line-height: 24px;
        color: var(--textColor);
        opacity: 0.6;
        margin-left: auto;
      }

      .separator {
        display: block;
        width: 1px;
        height: 30px;
        background-color: var(--textColor);
        opacity: 0.6;
        margin: 0 12px;
      }

      .logout-btn {
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
      }
    }
  }

  @media (min-width: 768px) {
    height: 80px;

    & > div {
      > a:nth-of-type(1) {
        svg {
          width: 23.49px;
          height: 23.49px;
        }
        span {
          font-size: 17.1px;
          line-height: 26px;
        }
      }

      .logout-btn > span {
        display: block;
        font-weight: 400;
        font-size: 16px;
        line-height: 24px;
      }
    }
  }
`;

export default StyledHeader;
