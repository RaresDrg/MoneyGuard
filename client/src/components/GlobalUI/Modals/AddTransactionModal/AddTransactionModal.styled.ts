import styled from "styled-components";
import AddTransactionModal from "./AddTransactionModal";

const StyledAddTransactionModal = styled(AddTransactionModal)`
  > div {
    padding: 20px;
    background: #4a3670;

    > form {
      width: 100%;

      & {
        .form-title,
        .form-title ~ div {
          margin-bottom: 40px;
        }

        div > label:has(> input#sumInput),
        div > label:has(> input#commentInput) {
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
      border: 0.5px solid #ffffff4d;

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
