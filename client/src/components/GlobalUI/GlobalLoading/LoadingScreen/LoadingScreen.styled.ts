import styled from "styled-components";
import LoadingScreen from "./LoadingScreen";

const StyledLoadingScreen = styled(LoadingScreen)`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 100dvh;
  background: linear-gradient(270.02deg, #2e1746 3.2%, #2e225f 99.98%);
  display: flex;
  cursor: wait;
  animation: fadeIn 1s both;

  & {
    video {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      animation: grayscaleToColor 5s ease-in-out infinite both;
    }

    .loader {
      margin: auto;
      font-size: 48px;
      line-height: 72px;
      font-weight: 700;
      letter-spacing: 2px;
      color: transparent;
      -webkit-text-stroke: 1px #ffffff66;
      position: relative;

      &:after {
        content: "Loading";
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        overflow: hidden;
        color: #ff868d80;
        -webkit-text-stroke: 1px var(--textColor);
        animation: expand 3s linear infinite alternate both;
      }
    }
  }

  @keyframes expand {
    0% {
      width: 0%;
    }
    100% {
      width: 100%;
    }
  }
`;

export default StyledLoadingScreen;
