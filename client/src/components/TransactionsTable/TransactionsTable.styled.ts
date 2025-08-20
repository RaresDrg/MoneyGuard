import styled from "styled-components";
import TransactionsTable from "./TransactionsTable";

const StyledTransactionsTable = styled(TransactionsTable)`
  width: 100%;
  border-spacing: 0;
  color: var(--textColor);

  & {
    > thead {
      position: sticky;
      top: 0;
      left: 0;
      z-index: 100;
      background: #523b7e;
      backdrop-filter: blur(100px);
      box-shadow: 0px 4px 60px 0px #00000040;

      & > tr > th {
        padding: 16px 20px;
        font-weight: 600;
        font-size: 16px;
        line-height: 24px;

        &:nth-child(1) {
          border-top-left-radius: 8px;
          border-bottom-left-radius: 8px;
          text-align: left;
        }

        &:nth-child(3) {
          text-align: left;
        }

        &:nth-child(5) {
          text-align: right;
        }

        &:last-child {
          border-top-right-radius: 8px;
          border-bottom-right-radius: 8px;
        }
      }
    }

    > tbody {
      & > tr > td {
        padding: 16px 20px;
        font-weight: 400;
        font-size: 14px;
        line-height: 21px;

        &:nth-child(2) {
          text-align: center;
          font-size: 16px;
        }

        &:nth-child(4) {
          width: 25%;
          max-width: 0;
        }

        &:nth-child(5) {
          width: 15%;
          max-width: 0;
          font-weight: 600;
          text-align: right;

          &.income {
            color: var(--incomeColor);
          }
          &.expense {
            color: var(--expenseColor);
          }
        }

        &:nth-child(6) {
          width: 0;
        }

        &:nth-child(7) {
          width: 0;
          padding: 16px 10px 16px 0;
        }
      }

      & > tr:not(:last-child) > td {
        border-bottom: 1px solid #ffffff33;
      }
    }
  }

  @media (min-width: 1280px) {
    display: block;
    height: calc(100% - 55px);
    max-height: fit-content;
    overflow-y: auto;
    scrollbar-gutter: stable;
    padding-right: 16px;

    &::-webkit-scrollbar {
      width: 8px;
      border-radius: 12px;
      background-color: #e8e8e8;
      cursor: pointer;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 12px;
      background-color: #523b7e99;
      cursor: move;
    }

    & > tbody > tr > td {
      &:nth-child(1) {
        width: 10%;
      }

      &:nth-child(2) {
        width: 10%;
      }

      &:nth-child(3) {
        width: 25%;
      }

      &:nth-child(4) {
        width: 35%;
      }

      &:nth-child(5) {
        width: 20%;
      }
    }
  }
`;

export default StyledTransactionsTable;
