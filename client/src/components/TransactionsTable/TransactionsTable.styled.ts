import styled from "styled-components";
import TransactionsTable from "./TransactionsTable";

const StyledTransactionsTable = styled(TransactionsTable)`
  animation: zoomIn 1s both;

  & {
    .row {
      display: grid;
      grid-template-columns:
        minmax(95px, 0.5fr) minmax(45px, 0.5fr) minmax(140px, 0.75fr)
        minmax(auto, 1.5fr) minmax(80px, 0.5fr) 80px 70px;
      align-items: center;
      gap: 10px;
      padding: 0 10px 0 20px;

      & {
        > :nth-child(3) {
          padding: 0 10px;
        }

        > :nth-child(5) {
          justify-self: end;
          padding-left: 10px;
        }

        > :nth-child(6) {
          width: fit-content;
          justify-self: end;
        }
      }
    }

    .row.header {
      position: sticky;
      top: 0;
      left: 0;
      z-index: 5;
      background: #523b7e;
      box-shadow: 0px 4px 60px 0px #00000040;
      height: 56px;
      border-radius: 8px;
      font-weight: 600;
      font-size: 16px;
      line-height: 24px;
      color: var(--textColor);

      & {
        > :nth-child(2),
        > :nth-child(3),
        > :nth-child(4) {
          justify-self: center;
        }
      }
    }

    .row.body {
      height: 53px;
      font-weight: 400;
      font-size: 14px;
      line-height: 21px;
      color: var(--textColor);
      animation: fadeIn 1s both;

      &:not(:last-of-type) {
        border-bottom: 1px solid #ffffff33;
      }

      & {
        > :nth-child(1) {
          font-family: var(--font-family-mono);
          font-variant-numeric: tabular-nums;
          font-size: 15px;
        }

        > :nth-child(2) {
          justify-self: center;
          font-size: 16px;
        }

        > :nth-child(4) {
          max-width: 100%;
        }

        > :nth-child(5) {
          max-width: 100%;
          font-weight: 600;

          &.income {
            color: var(--incomeColor);
          }
          &.expense {
            color: var(--expenseColor);
          }
        }
      }
    }
  }
`;

export default StyledTransactionsTable;
