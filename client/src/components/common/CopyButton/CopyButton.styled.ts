import styled from "styled-components";
import CopyButton from "./CopyButton";

const StyledCopyButton = styled(CopyButton)`
  color: var(--textColor);
  transition: var(--transition);
  opacity: 0.6;

  &:is(span) {
    font-weight: 400;
    font-size: 14px;
    line-height: 21px;
  }

  &:is(button) {
    &:hover {
      opacity: 1;
    }

    & > svg {
      height: 24px;
      width: 24px;
      fill: currentColor;
    }
  }
`;

export default StyledCopyButton;
