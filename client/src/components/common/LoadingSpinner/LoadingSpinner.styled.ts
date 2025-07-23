import styled from "styled-components";
import LoadingSpinner from "./LoadingSpinner";

const StyledLoadingSpinner = styled(LoadingSpinner)`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 250;
  height: 100dvh;
  width: 100%;
  background: #220d5b3b;
  backdrop-filter: blur(7px);
  cursor: wait;
  display: flex;
  justify-content: center;
  align-items: center;

  & {
    .loader,
    .loader:before,
    .loader:after {
      border-radius: 50%;
      width: 2.5em;
      height: 2.5em;
      animation-fill-mode: both;
      animation: bblFadInOut 1.8s infinite ease-in-out;
    }
    .loader {
      color: var(--textColor);
      font-size: 15px;
      position: relative;
      text-indent: -9999em;
      transform: translateZ(0);
      animation-delay: -0.16s;
    }
    .loader:before,
    .loader:after {
      content: "";
      position: absolute;
      top: 0;
    }
    .loader:before {
      left: -3.5em;
      animation-delay: -0.32s;
    }
    .loader:after {
      left: 3.5em;
    }
  }

  @keyframes bblFadInOut {
    0%,
    80%,
    100% {
      box-shadow: 0 2.5em 0 -1.3em;
    }
    40% {
      box-shadow: 0 2.5em 0 0;
    }
  }
`;

export default StyledLoadingSpinner;
