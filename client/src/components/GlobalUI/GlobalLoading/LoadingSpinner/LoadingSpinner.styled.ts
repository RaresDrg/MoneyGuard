import styled from "styled-components";
import LoadingSpinner from "./LoadingSpinner";

const StyledLoadingSpinner = styled(LoadingSpinner)`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 100dvh;
  background: #220d5b3b;
  backdrop-filter: blur(7px);
  display: flex;
  cursor: wait;
  animation: fadeIn 1s both;

  & {
    .loader {
      margin: auto;
      transform: translateY(-36px);
      width: 36px;
      height: 36px;
      border-radius: 50%;
      color: var(--textColor);
      position: relative;
      animation: bblFadInOut 1.8s ease-in-out -0.16s infinite both;

      &::before {
        content: "";
        width: 36px;
        height: 36px;
        border-radius: 50%;
        position: absolute;
        top: 0;
        left: -50px;
        animation: bblFadInOut 1.8s ease-in-out -0.32s infinite both;
      }

      &::after {
        content: "";
        width: 36px;
        height: 36px;
        border-radius: 50%;
        position: absolute;
        top: 0;
        left: 50px;
        animation: bblFadInOut 1.8s ease-in-out 0s infinite both;
      }
    }
  }

  @keyframes bblFadInOut {
    0%,
    80%,
    100% {
      box-shadow: 0 36px 0 -18px;
    }
    40% {
      box-shadow: 0 36px 0 0;
    }
  }
`;
export default StyledLoadingSpinner;
