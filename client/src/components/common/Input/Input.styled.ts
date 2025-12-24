import styled from "styled-components";
import Input from "./Input";

const StyledInput = styled(Input)`
  position: relative;

  & {
    label {
      display: block;
      padding: ${(props) =>
        props.type === "password" ? "0 50px 8px 54px" : "0 10px 8px 54px"};
      border-bottom: 1px solid var(--textColor);
      position: relative;
      opacity: 0.4;
      transition: var(--transition);

      &:has(+ p.error),
      &:has(> input:focus) {
        opacity: 1;
      }

      & {
        input {
          font-weight: ${(props) => (props.type === "decimal" ? "600" : "400")};
          font-size: 18px;
          line-height: 27px;
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

        svg {
          width: 24px;
          height: 24px;
          position: absolute;
          left: 10px;
          top: 2px;
          fill: var(--textColor);
        }
      }
    }

    .toggle-btn {
      position: absolute;
      top: -1.5px;
      right: 0;
      width: 30px;
      height: 30px;
      color: var(--textColor);
      opacity: 0.4;
      transition: var(--transition);

      &:hover {
        opacity: 1;
      }

      & > svg {
        width: 100%;
        height: 100%;
        fill: none;
        stroke: currentColor;
      }

      &:before {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotate(-45deg);
        background-color: currentColor;
        width: 2px;
        height: 0;
        transition: var(--transition);
      }

      &.visible::before {
        height: 100%;
      }
    }
  }
`;

export default StyledInput;
