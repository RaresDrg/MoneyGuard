import styled from "styled-components";
import CurrencyConverter from "./CurrencyConverter";

const StyledCurrencyConverter = styled(CurrencyConverter)`
  & {
    > p {
      font-size: 16px;
      line-height: 24px;
      color: var(--textColor);
      text-indent: 20px;
      margin-bottom: 30px;

      & {
        > span:nth-of-type(1) {
          font-weight: 600;
        }

        > span:nth-of-type(2) {
          font-weight: 400;
          padding-left: 4px;
          font-style: italic;
          opacity: 0.6;
        }
      }
    }

    > div {
      display: flex;
      flex-direction: column;
      background: #ffffff1a;
      backdrop-filter: blur(100px);
      box-shadow: 0px 4px 60px 0px #00000040;
      border: 0.5px solid var(--textColor);
      border-radius: 20px;
      padding: 40px 40px 24px 40px;

      & {
        > input {
          margin-bottom: 20px;
          font-weight: 600;
          font-size: 16px;
          line-height: 24px;
          padding: 0 20px 8px 20px;
          color: var(--textColor);
          caret-color: var(--textColor);
          border-bottom: 1px solid var(--textColor);
          opacity: 0.4;
          transition: var(--transition);

          &::placeholder {
            color: var(--textColor);
          }

          &:-webkit-autofill,
          &:-webkit-autofill:hover,
          &:-webkit-autofill:focus {
            -webkit-text-fill-color: var(--textColor);
            -webkit-background-clip: text;
          }

          &:focus {
            opacity: 1;
          }
        }

        > input + div {
          > button {
            opacity: 0.4;
          }

          > ul {
            background: #523b7e;
          }
        }

        div.result {
          display: flex;
          align-items: center;
          gap: 15px;
          position: relative;
          margin: 70px 0 130px 0;

          & {
            > output {
              font-weight: 600;
              font-size: 16px;
              line-height: 24px;
              color: var(--textColor);
              background-color: #ff868d80;
              box-shadow: 0px 6px 15px 0px #ff868d80;
              border: 0.5px solid #ffffff69;
              border-radius: 12px;
              padding: 10px 20px;
              min-width: 158px;

              & > b {
                padding-left: 5px;
              }
            }

            .info {
              cursor: help;
              position: absolute;
              top: -22px;
              left: 5px;
              opacity: 0.4;
              transition: var(--transition);

              &:hover {
                opacity: 1;
              }

              & > svg {
                width: 15px;
                height: 15px;
                fill: var(--textColor);
              }
            }
          }
        }

        p.exchange-info {
          font-weight: 400;
          font-size: 14px;
          line-height: 21px;
          font-style: italic;
          color: var(--textColor);
          text-align: center;
          margin-top: auto;
          display: flex;
          flex-direction: column;
          gap: 2px;
          opacity: 0.6;
        }
      }
    }
  }

  @media (min-width: 768px) {
    & > div {
      width: 500px;
      margin: 0 auto;
    }
  }
`;

export default StyledCurrencyConverter;
