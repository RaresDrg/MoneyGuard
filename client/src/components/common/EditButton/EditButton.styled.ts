import styled from "styled-components";
import EditButton from "./EditButton";

const StyledEditButton = styled(EditButton)`
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.32px;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  gap: 4px;
  color: var(--textColor);
  opacity: 0.6;
  transition: var(--transition);

  &:hover {
    opacity: 1;
  }

  & > svg {
    width: 14px;
    height: 14px;
    stroke: currentColor;
  }
`;

export default StyledEditButton;
