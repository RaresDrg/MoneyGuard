import styled from "styled-components";
import TransactionsListItem from "./TransactionsListItem";

const StyledTransactionsListItem = styled(TransactionsListItem)`
  background: #ffffff1a;
  border-radius: 10px;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: var(--textColor);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    display: block;
    width: 5px;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: ${(props) =>
      props.transaction.type === "income"
        ? "var(--incomeColor)"
        : "var(--expenseColor)"};
  }

  & {
    > p {
      padding: 12px 20px;
      display: flex;
      justify-content: space-between;
      gap: 30px;

      & > span:nth-of-type(2) {
        font-weight: 400;
        text-align: right;
      }
    }

    > p:not(:nth-last-of-type(1)) {
      border-bottom: 1px solid #ffffff33;
    }

    > p:nth-last-of-type(2) > span:nth-of-type(2) {
      font-weight: 600;
      color: ${(props) =>
        props.transaction.type === "income"
          ? "var(--incomeColor)"
          : "var(--expenseColor)"};
    }
  }
`;

export default StyledTransactionsListItem;
