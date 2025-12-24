import styled from "styled-components";
import ComboBox from "./ComboBox";

const StyledComboBox = styled(ComboBox)`
  width: 100%;
  position: relative;

  &.isOpen {
    > button,
    > label {
      opacity: 1;

      & > svg {
        transform: rotate(180deg);
      }
    }

    > ul {
      max-height: 230px;
      opacity: 1;
    }
  }

  & {
    > button,
    > label {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #4a56e21a;
      border-radius: 8px;
      border: 1px solid var(--textColor);
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
    }

    > button {
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
      color: var(--textColor);

      &:hover {
        opacity: 1;
      }
    }

    > label {
      gap: 15px;
      cursor: pointer;

      & > input {
        font-weight: 400;
        font-size: 16px;
        line-height: 24px;
        color: var(--textColor);
        caret-color: var(--textColor);

        &::placeholder {
          color: var(--textColor);
        }

        &:-webkit-autofill,
        &:-webkit-autofill:hover,
        &:-webkit-autofill:focus {
          -webkit-text-fill-color: var(--textColor);
          -webkit-background-clip: text;
        }
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
        #533dbab3 0%,
        #50309ab3 43.14%,
        #6a46a586 73.27%,
        #855daf22 120.03%
      );
      backdrop-filter: blur(100px);
      box-shadow: 0px 4px 60px 0px #00000040;
      border-radius: 8px;
      width: 100%;
      overflow-y: auto;
      max-height: 0;
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
        padding: 10px 20px;
        font-size: 16px;
        line-height: 24px;
        color: var(--textColor);

        &:not(.fallback-option) {
          font-weight: 400;
          cursor: pointer;

          &:hover {
            background-color: #ffffff1a;
            color: var(--expenseColor);
            font-weight: 600;
          }
        }

        &.fallback-option {
          text-align: center;
          background: grey;
          font-style: italic;
          font-weight: 500;
          cursor: not-allowed;
        }
      }
    }
  }
`;

export default StyledComboBox;
