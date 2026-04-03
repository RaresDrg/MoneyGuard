import styled from "styled-components";
import CopyButton from "./CopyButton";

const StyledCopyButton = styled(CopyButton)`
  width: 20px;
  height: 20px;
  transition: var(--transition);
  opacity: 0.5;

  & > svg {
    height: 100%;
    width: 100%;
  }

  &:hover,
  &:focus-visible,
  &:disabled {
    opacity: 1;
  }
`;

export default StyledCopyButton;
