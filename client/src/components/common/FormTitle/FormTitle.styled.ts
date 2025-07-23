import styled from "styled-components";
import FormTitle from "./FormTitle";

const StyledFormTitle = styled(FormTitle)`
  font-weight: 400;
  text-align: center;
  color: var(--textColor);
  line-height: 31px;
  font-size: 24px;

  @media (min-width: 768px) {
    line-height: 40px;
    font-size: 30px;
  }
`;

export default StyledFormTitle;
