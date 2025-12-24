import styled from "styled-components";
import NotFoundPage from "./NotFoundPage";

const StyledNotFoundPage = styled(NotFoundPage)`
  background-image: linear-gradient(270.02deg, #2e1746 3.2%, #2e225f 99.98%);
  animation: clipReveal 1.2s ease-out both;

  & > div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    padding: 20px;
    height: 100%;
    min-height: fit-content;
    position: relative;

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

      h1 {
        text-transform: uppercase;
        font-size: 30px;
        line-height: 45px;
        font-weight: 700;
        color: transparent;
        -webkit-text-stroke: 0.5px var(--textColor);
        animation: fadeInUp 0.6s 0.6s both;
      }

      .status {
        font-size: 60px;
        line-height: 90px;
        font-weight: 700;
        letter-spacing: 2px;
        color: transparent;
        -webkit-text-stroke: 0.5px #80808080;
        position: relative;

        &:after {
          content: "404";
          position: absolute;
          top: 0;
          left: 0px;
          height: 100%;
          overflow: hidden;
          color: #ff868d80;
          mix-blend-mode: color-dodge;
          -webkit-text-stroke: 1px var(--textColor);
          animation: fadeExpand 3s linear 0.6s infinite alternate both;
        }
      }

      p {
        text-indent: 25px;
        font-style: italic;
        font-weight: 400;
        font-size: 12px;
        line-height: 20px;
        color: var(--textColor);
        text-shadow: 2px 2px 5px darkred;
        max-width: 365px;
        animation: fadeInDown 0.6s 0.6s both;
      }
    }
  }

  @media (min-width: 768px) {
    & > div {
      padding: 50px;
      justify-content: space-around;

      & {
        h1 {
          font-size: 40px;
          line-height: 60px;
          -webkit-text-stroke: 0.75px var(--textColor);
        }

        .status {
          font-size: 70px;
          line-height: 105px;
          letter-spacing: 3px;
          -webkit-text-stroke: 1px #80808080;

          &:after {
            -webkit-text-stroke: 1.5px var(--textColor);
          }
        }

        p {
          font-size: 14px;
          line-height: 22px;
          max-width: 420px;
        }
      }
    }
  }

  @media (min-width: 1280px) {
    & > div {
      justify-content: space-between;

      & {
        h1 {
          font-size: 50px;
          line-height: 75px;
          -webkit-text-stroke: 1px var(--textColor);
        }

        .status {
          font-size: 100px;
          line-height: 150px;
          letter-spacing: 4px;
          -webkit-text-stroke: 1.5px #80808080;

          &:after {
            -webkit-text-stroke: 2px var(--textColor);
          }
        }

        p {
          text-indent: 35px;
          max-width: 540px;
          font-size: 18px;
          line-height: 26px;
        }
      }
    }
  }

  @keyframes fadeExpand {
    0% {
      opacity: 0;
      width: 0%;
    }
    100% {
      opacity: 1;
      width: 100%;
    }
  }
`;

export default StyledNotFoundPage;
