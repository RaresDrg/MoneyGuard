import styled from "styled-components";
import CopyButton from "./CopyButton";

const StyledCopyButton = styled(CopyButton)`
  width: 20px;
  height: 20px;
  transition: var(--transition);
  opacity: 0.5;

  &:hover {
    opacity: 1;
  }

  & > svg {
    height: 100%;
    width: 100%;
  }

  &[disabled] {
    opacity: 0.8;
  }
`;

export default StyledCopyButton;
