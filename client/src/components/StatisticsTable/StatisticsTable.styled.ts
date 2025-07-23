import styled from "styled-components";
import StatisticsTable from "./StatisticsTable";
import { EXPENSE_BACKGROUNDS } from "../../constants";

const dynamicRowStyles = EXPENSE_BACKGROUNDS.map(
  (item, index) => `
    &:nth-of-type(${index + 2}) > span:nth-child(1):before {
      background-color: ${item};
    }
  `
).join("");

const StyledStatisticsTable = styled(StatisticsTable)`
  &.fallback {
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: #ffffff99;
    text-align: center;
    font-style: italic;
  }

  & {
    .head {
      position: sticky;
      top: 0;
      left: 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #523b7e;
      border-radius: 8px;
      padding: 16px;
      backdrop-filter: blur(100px);
      box-shadow: 0px 4px 60px 0px #00000040;
      font-weight: 600;
      font-size: 16px;
      line-height: 24px;
      color: var(--textColor);
    }

    .row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 30px;
      padding: 14px 16px;
      border-bottom: 1px solid #ffffff33;
      font-weight: 400;
      font-size: 14px;
      line-height: 21px;
      color: var(--textColor);

      & > span:nth-child(1) {
        display: flex;
        align-items: center;
        gap: 16px;

        &:before {
          content: "";
          width: 24px;
          height: 24px;
          border-radius: 2px;
        }
      }

      ${dynamicRowStyles}
    }

    .total {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 20px;
      padding: 0 16px;
      font-weight: 600;
      font-size: 14px;
      line-height: 21px;
      color: var(--textColor);

      &.expense {
        margin: 16px 0;

        & > span:nth-of-type(2) {
          color: var(--expenseColor);
        }
      }

      &.income > span:nth-of-type(2) {
        color: var(--incomeColor);
      }
    }
  }
`;

export default StyledStatisticsTable;
