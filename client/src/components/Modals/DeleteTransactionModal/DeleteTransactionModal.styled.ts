import styled from "styled-components";
import DeleteTransactionModal from "./DeleteTransactionModal";

const StyledDeleteTransactionModal = styled(DeleteTransactionModal)`
  & > div {
    padding: 20px;

    > h2 {
      margin-bottom: 100px;
    }

    > button:nth-of-type(1) {
      margin-bottom: 20px;
    }
  }

  @media (min-width: 768px) {
    & > div {
      padding: 60px;

      > h2 {
        margin-bottom: 60px;
      }
    }
  }
`;

export default StyledDeleteTransactionModal;
