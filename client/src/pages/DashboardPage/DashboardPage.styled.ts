import styled from "styled-components";
import DashboardPage from "./DashboardPage";

const StyledDashboardPage = styled(DashboardPage)`
  margin-top: 40px;

  & {
    .fallback {
      margin-top: 20px;

      & > b {
        color: #ffffffbf;
      }
    }

    .text-loader {
      margin-top: 20px;
    }

    .add-btn {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: linear-gradient(
        96.76deg,
        #ffc727 -16.42%,
        #9e40ba 97.04%,
        #7000ff 150.71%
      );
      box-shadow: 1px 9px 15px 0px #00000033;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      bottom: 6px;
      right: 20px;
      opacity: 0.6;
      transition: var(--transition);
      animation: heartBeat 1.3s ease-in-out both;

      & > svg {
        width: 20px;
        height: 20px;
        stroke: var(--textColor);
      }

      &:hover {
        border: 1px solid var(--textColor);
        opacity: 1;
        scale: 1.15;
      }
    }
  }

  @media (min-width: 768px) {
    margin-top: 0;

    & {
      .fallback,
      .text-loader {
        margin-top: 0;
      }

      .add-btn {
        width: 44px;
        height: 44px;
        right: 32px;
        bottom: 7px;
      }
    }
  }
`;

export default StyledDashboardPage;
