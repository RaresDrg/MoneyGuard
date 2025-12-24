import styled from "styled-components";
import ModalContainer from "./ModalContainer";

const StyledModalContainer = styled(ModalContainer)`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 50;
  background: #220d5b3b;
  backdrop-filter: blur(7px);
  width: 100%;
  height: 100dvh;
  overflow: auto;
  scrollbar-width: none;
  animation: fadeIn 0.35s ease-in-out both;

  &::-webkit-scrollbar {
    display: none;
  }

  &.hidden {
    animation: fadeOut 0.35s ease-in-out forwards;
  }

  & > :nth-child(1) {
    min-width: 320px;
  }

  @media (min-width: 768px) {
    display: flex;
    padding: 50px;
  }
`;

export default StyledModalContainer;
