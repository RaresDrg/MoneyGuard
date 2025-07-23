import styled from "styled-components";
import Input from "./Input";

const StyledInput = styled(Input)`
  position: relative;

  & {
    label {
      & {
        input {
          font-weight: 400;
          font-size: 18px;
          line-height: 27px;
          padding: ${(props) =>
            props.type === "text" ? "0 10px 8px 54px" : "0 50px 8px 54px"};
          color: var(--textColor);
          caret-color: var(--textColor);
          border-bottom: 1px solid var(--textColor);
          opacity: 0.4;
          transition: var(--transition);

          &::placeholder {
            color: var(--textColor);
          }

          &:-webkit-autofill,
          &:-webkit-autofill:hover,
          &:-webkit-autofill:focus {
            -webkit-text-fill-color: var(--textColor);
            -webkit-background-clip: text;
          }

          &:focus {
            opacity: 1;

            & + svg {
              opacity: 1;
            }
          }
        }

        svg {
          width: 24px;
          height: 24px;
          position: absolute;
          left: 10px;
          top: 2px;
          fill: var(--textColor);
          opacity: 0.4;
          transition: var(--transition);
        }
      }
    }

    .showPassword {
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

  &.onError {
    label {
      & {
        input {
          opacity: 1;
        }

        svg {
          opacity: 1;
        }
      }
    }

    .error {
      margin-top: 2px;
      margin-left: 10px;
      font-weight: 600;
      font-size: 14px;
      color: var(--errorColor);
    }
  }
`;

export default StyledInput;
