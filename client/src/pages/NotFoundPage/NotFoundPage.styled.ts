import styled from "styled-components";
import NotFoundPage from "./NotFoundPage";

const StyledNotFoundPage = styled(NotFoundPage)`
  flex-direction: column;
  justify-content: space-between;
  gap: 50px;
  padding: 20px;

  & {
    video {
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      width: 100%;
      height: 100%;
      object-fit: cover;
      animation: grayscaleToColor 5s ease-in-out infinite;
    }

    h1 {
      text-transform: uppercase;
      text-align: center;
      color: transparent;
      -webkit-text-stroke: 1px var(--textColor);
      font-weight: bold;
      font-size: 30px;
    }

    h2 {
      text-align: center;
      color: transparent;
      -webkit-text-stroke: 1.5px var(--textColor);
      font-weight: bold;
      font-size: 60px;
    }

    p {
      color: var(--textColor);
      font-style: italic;
      font-weight: 400;
      margin: 0 auto;
      text-indent: 25px;
      min-width: 270px;
      max-width: 365px;
      font-size: 12px;
      line-height: 20px;
    }
  }

  @media (min-width: 768px) {
    padding: 50px;
    justify-content: space-around;

    & {
      h1 {
        font-size: 40px;
        -webkit-text-stroke: 1.5px var(--textColor);
      }

      h2 {
        font-size: 80px;
        -webkit-text-stroke: 2px var(--textColor);
      }

      p {
        max-width: 420px;
        font-size: 14px;
        line-height: 22px;
      }
    }
  }

  @media (min-width: 1280px) {
    justify-content: space-between;

    & {
      h1 {
        font-size: 60px;
        -webkit-text-stroke: 2px var(--textColor);
      }

      h2 {
        font-size: 120px;
        -webkit-text-stroke: 3px var(--textColor);
      }

      p {
        text-indent: 35px;
        max-width: 540px;
        font-size: 18px;
        line-height: 26px;
      }
    }
  }
`;

export default StyledNotFoundPage;
