import styled from "styled-components";
import Input from "./Input";

const StyledInput = styled(Input)`
  position: relative;

  & {
    label {
      opacity: 0.4;
      transition: var(--transition);

      &:has(+ p.error),
      &:has(> input:focus) {
        opacity: 1;
      }

      & {
        input {
          font-weight: 400;
          font-size: 18px;
          line-height: 27px;
          padding-top: 0;
          padding-right: ${(props) =>
            props.type === "password" ? "50px" : "10px"};
          padding-bottom: 8px;
          padding-left: 54px;
          color: var(--textColor);
          caret-color: var(--textColor);
          border-bottom: 1px solid var(--textColor);

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

    .toggle-icon {
      position: absolute;
      top: -1.5px;
      right: 0;
      cursor: pointer;
      color: var(--textColor);
      opacity: 0.4;
      transition: var(--transition);

      &:hover {
        opacity: 1;
      }
    }
  }
`;

export default StyledInput;
