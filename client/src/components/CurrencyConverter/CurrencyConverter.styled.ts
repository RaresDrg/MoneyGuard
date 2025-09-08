import styled from "styled-components";
import CurrencyConverter from "./CurrencyConverter";

const StyledCurrencyConverter = styled(CurrencyConverter)`
  & > form {
    background: #ffffff1a;
    backdrop-filter: blur(100px);
    box-shadow: 0px 4px 60px 0px #00000040;
    border: 0.5px solid #ffffff99;
    border-radius: 20px;
    padding: 40px 40px 24px 40px;

    & {
      > h3 {
        font-weight: 600;
        font-size: 20px;
        line-height: 30px;
        color: var(--textColor);
        text-align: center;
        max-width: 320px;
        margin: 0 auto 20px auto;
      }

      .intro {
        font-weight: 400;
        font-size: 14px;
        line-height: 21px;
        color: var(--textColor);
        opacity: 0.6;
        font-style: italic;
        text-indent: 10px;
        margin-bottom: 40px;
      }

      .intro ~ div:nth-of-type(1) {
        margin-bottom: 40px;

        label > input {
          font-weight: 600;
          padding: 0 20px 8px 20px;
        }
      }

      .intro ~ div:nth-of-type(2):has(+ div) {
        margin-bottom: 40px;
      }

      .intro ~ div:nth-of-type(2):not(:has(+ div)) {
        margin-bottom: 195px;
      }

      p.update-info {
        font-weight: 400;
        font-size: 14px;
        line-height: 21px;
        font-style: italic;
        color: var(--textColor);
        text-align: center;
        display: flex;
        flex-direction: column;
        gap: 2px;
        opacity: 0.6;
      }
    }
  }

  @media (min-width: 768px) {
    & > form {
      width: 500px;
      margin: 0 auto;
    }
  }

  @media (min-width: 1280px) {
    height: calc(100% - 60px);
    overflow: auto;
    padding-right: 16px;
    scrollbar-gutter: stable;

    &::-webkit-scrollbar {
      width: 8px;
      border-radius: 12px;
      background-color: #b0afc0;
      cursor: pointer;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 12px;
      background-color: #523b7e99;
      cursor: move;
    }

    & > form {
      width: 510px;

      & {
        .intro ~ div:nth-of-type(1) {
          display: inline-block;
          vertical-align: sub;
          width: calc(50% - 20px);
          margin-right: 30px;
        }

        .intro ~ div:nth-of-type(2) {
          display: inline-block;
          width: calc(50% - 10px);
        }
      }
    }
  }
`;

export default StyledCurrencyConverter;
