import styled from "styled-components";
import Select from "./Select";

const StyledSelect = styled(Select)`
  width: 100%;
  position: relative;

  &.isOpen {
    > button {
      opacity: 1;

      & > svg {
        transform: rotate(180deg);
      }
    }

    > ul {
      opacity: 1;
      clip-path: inset(0 0 0 0);
    }
  }

  & {
    > button {
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
      color: var(--textColor);
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #4a56e21a;
      border-radius: 8px;
      border: 1px solid var(--textColor);
      outline: none;
      padding: 13px 20px;
      opacity: 0.6;
      transition: var(--transition);

      & > svg {
        width: 18px;
        height: 9px;
        fill: transparent;
        stroke: var(--textColor);
        transition: var(--transition);
      }

      &:hover,
      &:focus-visible {
        opacity: 1;
      }
    }

    > ul {
      position: absolute;
      z-index: 5;
      left: 0;
      top: calc(100% + 5px);
      background: linear-gradient(
        0deg,
        #533dbab3 0%,
        #50309ab3 43.14%,
        #6a46a586 73.27%,
        #855daf22 120.03%
      );
      -webkit-backdrop-filter: blur(100px);
      backdrop-filter: blur(100px);
      box-shadow: 0px 4px 60px 0px #00000040;
      border-radius: 8px;
      outline: none;
      width: 100%;
      max-height: 230px;
      overflow-y: auto;
      clip-path: inset(0 0 100% 0);
      opacity: 0;
      transition: var(--transition);

      &::-webkit-scrollbar {
        width: 6px;
        border-radius: 12px;
        background-color: transparent;
      }
      &::-webkit-scrollbar-thumb {
        width: 6px;
        border-radius: 12px;
        background-color: #bfb4dd;
        cursor: pointer;
      }

      & > li {
        font-weight: 400;
        font-size: 16px;
        line-height: 24px;
        color: var(--textColor);
        padding: 10px 20px;
        cursor: pointer;

        &.highlighted {
          background-color: #ffffff1a;
          color: var(--expenseColor);
          font-weight: 600;
        }
      }
    }
  }
`;

export default StyledSelect;
