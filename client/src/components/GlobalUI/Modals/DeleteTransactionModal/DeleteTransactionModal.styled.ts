import styled from "styled-components";
import DeleteTransactionModal from "./DeleteTransactionModal";

const StyledDeleteTransactionModal = styled(DeleteTransactionModal)`
  & > div {
    padding: 20px;
    background: #4a3670;

    > p {
      font-weight: 400;
      font-size: 18px;
      line-height: 27px;
      text-align: center;
      color: var(--textColor);
      margin: 60px 0 40px 0;
    }

    > button:nth-of-type(1) {
      margin-bottom: 20px;
    }
  }

  @media (min-width: 768px) {
    & > div {
      padding: 40px 70px;
      border: 0.5px solid #ffffff4d;

      > p {
        font-size: 20px;
        line-height: 30px;
      }
    }
  }
`;

export default StyledDeleteTransactionModal;
