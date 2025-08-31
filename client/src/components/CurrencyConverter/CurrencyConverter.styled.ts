import styled from "styled-components";
import CurrencyConverter from "./CurrencyConverter";

const StyledCurrencyConverter = styled(CurrencyConverter)`
  & > .form {
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

      > h3 + p {
        font-weight: 400;
        font-size: 14px;
        line-height: 21px;
        color: var(--textColor);
        opacity: 0.6;
        font-style: italic;
        text-indent: 10px;
        margin-bottom: 40px;
      }

      div.input-field {
        position: relative;
        margin-bottom: 40px;

        & {
          > input {
            font-weight: 600;
            font-size: 18px;
            line-height: 27px;
            padding: 0 20px 8px 20px;
            color: var(--textColor);
            caret-color: var(--textColor);
            border-bottom: 1px solid var(--textColor);
            opacity: 0.4;
            transition: var(--transition);

            &:focus,
            &:has(+ p.error) {
              opacity: 1;
            }

            &::placeholder {
              color: var(--textColor);
            }

            &:-webkit-autofill,
            &:-webkit-autofill:hover,
            &:-webkit-autofill:focus {
              -webkit-text-fill-color: var(--textColor);
              -webkit-background-clip: text;
            }
          }
        }
      }

      div.input-field + div {
        & {
          button {
            font-size: 18px;
            line-height: 27px;
            opacity: 0.4;

            &:hover,
            &.isTriggered {
              opacity: 1;
            }
          }

          ul {
            background: #523b7e;
          }
        }

        &:has(+ div.result) {
          margin-bottom: 40px;
        }

        &:not(:has(+ div.result)) {
          margin-bottom: 195px;
        }
      }

      div.result {
        display: flex;
        margin-bottom: 95px;

        & {
          > :nth-child(1) {
            width: 60px;
            height: 60px;
            fill: #ffffff99;
            flex-shrink: 0;
          }

          > :nth-child(2) {
            font-weight: 600;
            font-size: 18px;
            line-height: 27px;
            color: var(--textColor);
            background-color: #ff868d33;
            backdrop-filter: blur(100px);
            box-shadow: 0px 6px 15px 0px #ff868d50;
            border: 0.5px solid #ffffff80;
            border-radius: 12px;
            padding: 8.5px 17px;
            min-width: 91px;
            align-self: end;
            margin: 0 10px;
          }

          > :nth-child(3) {
            flex-shrink: 0;
            align-self: end;
            margin-bottom: 13px;
          }
        }
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
    & > .form {
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

    & > .form {
      & {
        div.input-field {
          display: inline-block;
          vertical-align: sub;
          width: calc(50% - 20px);
          margin-right: 30px;
        }

        div.input-field + div {
          display: inline-block;
          width: calc(50% - 10px);
        }
      }
    }
  }
`;

export default StyledCurrencyConverter;
