import styled from "styled-components";
import TransactionsList from "./TransactionsList";

const StyledTransactionsList = styled(TransactionsList)`
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  gap: 15px;

  & > li {
    background: #ffffff1a;
    border-radius: 10px;
    overflow: hidden;
    position: relative;
    animation: jackInTheBox 1s both;

    &::before {
      content: "";
      display: block;
      width: 5px;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }

    & {
      > p {
        font-size: 16px;
        line-height: 24px;
        color: var(--textColor);
        padding: 12px 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 30px;

        & {
          > span:nth-of-type(1) {
            font-weight: 600;
          }

          > span:nth-of-type(2) {
            font-weight: 400;
            text-align: right;
          }
        }
      }

      > p:not(:nth-last-of-type(1)) {
        border-bottom: 1px solid #ffffff33;
      }
    }
  }

  & > li.income {
    &::before {
      background-color: var(--incomeColor);
    }
    p.sum > span:nth-of-type(2) {
      font-weight: 600;
      color: var(--incomeColor);
    }
  }

  & > li.expense {
    &::before {
      background-color: var(--expenseColor);
    }
    p.sum > span:nth-of-type(2) {
      font-weight: 600;
      color: var(--expenseColor);
    }
  }
`;

export default StyledTransactionsList;
