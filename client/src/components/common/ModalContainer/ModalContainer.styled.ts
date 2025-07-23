import styled from "styled-components";
import ModalContainer from "./ModalContainer";

const StyledModalContainer = styled(ModalContainer)`
  position: fixed;
  top: 60px;
  left: 0;
  z-index: 200;
  height: calc(100dvh - 60px);
  width: 100%;
  overflow: auto;
  pointer-events: all;
  background: #220d5b3b;
  backdrop-filter: blur(7px);
  animation: fadeIn 0.35s ease-in-out;

  &.hidden {
    animation: fadeOut 0.35s ease-in-out forwards;
  }

  &::-webkit-scrollbar {
    width: 0px;
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: transparent;
  }

  @media (min-width: 768px) {
    top: 0;
    height: 100dvh;
    display: flex;
    padding: 50px;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`;

export default StyledModalContainer;
