import styled from "styled-components";
import CurrencyConverter from "./CurrencyConverter";

const StyledCurrencyConverter = styled(CurrencyConverter)`
  margin-top: 15px;

  & {
    .intro {
      text-indent: 15px;
      margin-bottom: 32px;
      animation: fadeInUp 1s both;

      & {
        > span:nth-of-type(1) {
          font-weight: 500;
          font-size: 18px;
          line-height: 27px;
          color: var(--textColor);
        }

        > span:nth-of-type(2) {
          font-weight: 400;
          font-size: 16px;
          line-height: 24px;
          color: #ffffff99;
          font-style: italic;
          margin-left: 5px;

          & > b {
            color: #ffffffb3;
          }
        }
      }
    }

    div.form {
      background: #ffffff1a;
      backdrop-filter: blur(10px);
      box-shadow: 0px 4px 60px 0px #00000040;
      border: 0.5px solid #ffffff66;
      padding: 30px 20px 15px 20px;
      border-radius: 12px;
      animation: zoomIn 1s both;

      & {
        .amount {
          display: block;
          padding: 0 20px 8px 20px;
          border-bottom: 1px solid var(--textColor);
          margin-bottom: 20px;
          opacity: 0.6;
          transition: var(--transition);

          &:has(> input:focus) {
            opacity: 1;
          }

          & > input {
            font-weight: 600;
            font-size: 18px;
            line-height: 27px;
            color: var(--textColor);
            caret-color: var(--textColor);

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

        .currency {
          margin-bottom: 50px;

          & {
            > label > input {
              font-size: 18px;
              line-height: 27px;
            }

            > ul {
              background: #523b7e;
            }
          }
        }

        .result {
          display: flex;
          justify-content: center;
          align-items: end;
          gap: 10px;
          margin-bottom: 80px;

          & {
            > :nth-child(1) {
              flex-shrink: 0;
              width: 60px;
              height: 60px;
              fill: #ffffff99;
            }

            > :nth-child(2) {
              font-weight: 600;
              font-size: 18px;
              line-height: 27px;
              color: var(--textColor);
              background-color: #ff868d33;
              border: 0.5px solid #ffffff80;
              border-radius: 12px;
              padding: 8.5px 17px;
              min-width: 91px;

              &::first-letter {
                font-weight: 400;
              }
            }

            > :nth-child(3) {
              flex-shrink: 0;
              margin-bottom: 13px;
            }
          }
        }

        .info {
          display: flex;
          flex-direction: column;
          text-align: center;

          & {
            > span:nth-of-type(1) {
              font-weight: 400;
              font-size: 14px;
              line-height: 21px;
              color: #ffffff99;
            }

            > b {
              font-family: var(--font-family-mono);
              font-variant-numeric: tabular-nums;
              font-size: 16px;
              line-height: 24px;
              color: #ffffffb3;
            }
          }
        }
      }
    }
  }

  @media (min-width: 768px) {
    & > div.form {
      width: 400px;
      margin: 0 auto;
    }
  }
`;

export default StyledCurrencyConverter;
