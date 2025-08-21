import styled from "styled-components";
import LoadingScreen from "./LoadingScreen";

const StyledLoadingScreen = styled(LoadingScreen)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100dvh;
  cursor: wait;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(270.02deg, #2e1746 3.2%, #2e225f 99.98%);

  & {
    video {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      animation: grayscaleToColor 5s ease-in-out infinite;
    }

    .loader {
      font-size: 48px;
      line-height: 72px;
      font-weight: bold;
      letter-spacing: 2px;
      position: relative;
      color: transparent;
      -webkit-text-stroke: 1px #ffffff66;

      &:after {
        content: "Loading";
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        overflow: hidden;
        color: #ff868d80;
        -webkit-text-stroke: 1px var(--textColor);
        animation: animloader 3s linear infinite;
        animation-direction: alternate;
      }
    }
  }

  @keyframes animloader {
    0% {
      width: 0%;
    }
    100% {
      width: 100%;
    }
  }
`;

export default StyledLoadingScreen;
