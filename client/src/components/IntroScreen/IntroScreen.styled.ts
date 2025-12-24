import styled from "styled-components";
import IntroScreen from "./IntroScreen";

const StyledIntroScreen = styled(IntroScreen)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100dvh;
  padding: 20px;
  background: radial-gradient(circle at 20% 80%, #623f8bcc 0%, #c55f92cc 100%);
  box-shadow: inset 0 0 120px grey;
  display: flex;
  overflow: auto;
  scrollbar-width: none;
  animation: clipReveal 1.2s ease-out both;

  &::-webkit-scrollbar {
    display: none;
  }

  &.hidden {
    animation: clipDismiss 1.2s ease-in forwards;
  }

  & > p {
    margin: auto;
    text-align: center;
    font-weight: 600;
    font-size: 20px;
    line-height: 30px;
    letter-spacing: 0.5px;
    color: var(--textColor);
    -webkit-text-stroke: 0.5px #3e2a5e;
    text-shadow: 2px 2px 4px black;
    white-space: pre-line;
    animation: fadeInFirst 2s ease-out 1.2s both;

    &.italic {
      font-style: italic;
      animation: fadeInSecond 3s ease-out both;
    }
  }

  @media (min-width: 768px) {
    padding: 50px;

    & > p {
      font-size: 30px;
      line-height: 45px;
      letter-spacing: 0.75px;
      -webkit-text-stroke: 0.75px #3e2a5e;
      text-shadow: 3px 3px 5px black;
    }
  }

  @media (min-width: 1280px) {
    & > p {
      font-size: 40px;
      line-height: 60px;
      letter-spacing: 1px;
      -webkit-text-stroke: 1px #3e2a5e;
      text-shadow: 4px 4px 6px black;
    }
  }

  @keyframes fadeInFirst {
    from {
      opacity: 0.5;
      transform: scale(0.5);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes fadeInSecond {
    from {
      opacity: 0.5;
      transform: scale(0.5);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

export default StyledIntroScreen;
