import styled from "styled-components";
import AddTransactionModal from "./AddTransactionModal";

const StyledAddTransactionModal = styled(AddTransactionModal)`
  > div {
    padding: 20px;

    > form {
      width: 100%;

      & {
        > h2 {
          margin-bottom: 40px;
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

export default StyledAddTransactionModal;
