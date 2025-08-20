import styled from "styled-components";
import FormContainer from "./FormContainer";

const StyledFormContainer = styled(FormContainer)`
  background: #523b7e;
  backdrop-filter: blur(100px);
  box-shadow: 0px 4px 60px 0px #00000040;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-width: 320px;
  min-height: fit-content;

  @media (min-width: 768px) {
    width: 540px;
    height: fit-content;
    margin: auto;
    border-radius: 8px;
    border: 1px solid #ffffff66;
  }
`;

export default StyledFormContainer;
