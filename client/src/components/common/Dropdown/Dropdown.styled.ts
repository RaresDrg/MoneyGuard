import styled from "styled-components";
import Dropdown from "./Dropdown";

const StyledDropdown = styled(Dropdown)`
  position: relative;

  & {
    > button {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      background: #4a56e21a;
      border-radius: 8px;
      padding: 13px 20px;
      border: 1px solid var(--textColor);
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
      color: var(--textColor);
      opacity: 0.6;
      transition: var(--transition);

      &:hover {
        opacity: 1;
      }
      &.isTriggered {
        opacity: 1;

        > svg {
          rotate: 180deg;
        }
      }

      & > svg {
        width: 18px;
        height: 9px;
        fill: transparent;
        stroke: currentColor;
        transition: var(--transition);
      }
    }

    > ul {
      position: absolute;
      z-index: 5;
      left: 0;
      bottom: -5px;
      transform: translateY(100%);
      background: linear-gradient(
        0deg,
        rgba(83, 61, 186, 0.7) 0%,
        rgba(80, 48, 154, 0.7) 43.14%,
        rgba(106, 70, 165, 0.525) 73.27%,
        rgba(133, 93, 175, 0.133) 120.03%
      );
      backdrop-filter: blur(100px);
      box-shadow: 0px 4px 60px 0px #00000040;
      border-radius: 8px;
      overflow: auto;
      width: 100%;
      height: 0;
      opacity: 0;
      transition: var(--transition);

      &.isVisible {
        height: 230px;
        opacity: 1;
      }

      &::-webkit-scrollbar {
        width: 6px;
        border-radius: 12px;
        background-color: transparent;
      }
      &::-webkit-scrollbar-thumb {
        width: 6px;
        border-radius: 12px;
        background-color: #bfb4dd;
        cursor: move;
      }

      & > li {
        padding: 0 20px;
        cursor: pointer;
        font-weight: 400;
        font-size: 16px;
        line-height: 44px;
        color: var(--textColor);

        &:hover {
          background-color: #ffffff1a;
          color: var(--expenseColor);
          font-weight: 600;
        }
      }
    }
  }
`;

export default StyledDropdown;
