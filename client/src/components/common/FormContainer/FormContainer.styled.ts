import styled from "styled-components";
import FormContainer from "./FormContainer";

const StyledFormContainer = styled(FormContainer)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: fit-content;
  background: #ffffff1a;
  backdrop-filter: blur(30px);
  animation: fadeIn 1s both;

  &.hidden {
    animation: fadeOut 1s forwards;
  }

  @media (min-width: 768px) {
    width: 540px;
    height: fit-content;
    margin: auto;
    border-radius: 8px;
    box-shadow: 0px 4px 60px 0px #00000040;
    animation: fadeInDown 1s both;

    &.hidden {
      animation: fadeOutUp 1s forwards;
    }
  }
`;

export default StyledFormContainer;
