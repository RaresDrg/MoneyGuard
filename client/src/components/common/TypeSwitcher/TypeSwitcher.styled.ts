import styled from "styled-components";
import TypeSwitcher from "./TypeSwitcher";

const StyledTypeSwitcher = styled(TypeSwitcher)`
  display: flex;
  gap: 24px;
  align-items: center;
  justify-content: center;

  &:has(> label > input:not(:checked)) > span:nth-of-type(1) {
    color: var(--incomeColor);
    opacity: 1;
  }

  &:has(> label > input:checked) > span:nth-of-type(2) {
    color: var(--expenseColor);
    opacity: 1;
  }

  & {
    span {
      font-weight: 600;
      font-size: 16px;
      line-height: 24px;
      color: var(--textColor);
      opacity: 0.6;
      transition: var(--transition);
    }

    label {
      width: 80px;
      height: 40px;
      border-radius: 30px;
      background-color: var(--textColor);
      box-shadow: inset 0px 5px 15px #00000066, inset 0 -5px 15px #ffffff66;
      cursor: pointer;
      position: relative;
    }

    input {
      position: absolute;
      top: -2px;
      left: -4px;
      width: 44px;
      height: 44px;
      border-radius: 50%;
      cursor: pointer;
      background-color: var(--incomeColor);
      box-shadow: 0px 6px 15px 0px #ffc72780;
      transition: var(--transition);

      &:checked {
        background-color: var(--expenseColor);
        box-shadow: 0px 6px 15px 0px #ff868d80;
        transform: translateX(100%);

        &:before {
          opacity: 0;
        }
      }

      &:after,
      &:before {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: var(--textColor);
        transition: var(--transition);
      }

      &:after {
        width: 20px;
        height: 2px;
      }

      &:before {
        width: 2px;
        height: 20px;
      }
    }
  }
`;

export default StyledTypeSwitcher;
