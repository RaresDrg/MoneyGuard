import styled from "styled-components";
import EditTransactionModal from "./EditTransactionModal";

const StyledEditTransactionModal = styled(EditTransactionModal)`
  > div {
    padding: 20px;

    > form {
      width: 100%;

      & {
        > h2 {
          margin-bottom: 40px;
        }

        .type {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 12px;

          &.income > span:nth-of-type(1) {
            color: var(--incomeColor);
            opacity: 1;
            font-weight: 600;
          }
          &.expense > span:nth-of-type(2) {
            color: var(--expenseColor);
            opacity: 1;
            font-weight: 600;
          }

          & {
            > svg {
              width: 24px;
              height: 24px;
            }

            > span {
              font-weight: 400;
              font-size: 16px;
              line-height: 24px;
              color: var(--textColor);
              opacity: 0.6;
            }
          }
        }

        > h2 ~ div {
          margin-bottom: 40px;
        }

        > div > label > #sumInput {
          font-weight: 600;
          padding: 0 20px 8px 20px;
        }

        > div > label > #commentInput {
          padding: 0 20px 8px 20px;
        }

        > button:nth-last-of-type(1) {
          margin-top: 20px;
        }
      }
    }
  }

  @media (min-width: 768px) {
    > div {
      padding: 40px 70px;

      > form {
        > div:has(> label > #sumInput),
        > div:has(> label > #sumInput) + div {
          display: inline-block;
          width: calc(50% - 20px);
          vertical-align: top;
        }

        > div:has(> label > #sumInput) {
          margin-right: 40px;
        }
      }
    }
  }
`;

export default StyledEditTransactionModal;
