import styled from "styled-components";
import AddButton from "./AddButton";

const StyledAddButton = styled(AddButton)`
  width: 40px;
  height: 40px;
  background: linear-gradient(
    96.76deg,
    #ffc727 -16.42%,
    #9e40ba 97.04%,
    #7000ff 150.71%
  );
  box-shadow: 1px 9px 15px 0px #00000033;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 20px;
  right: 20px;
  opacity: 0.7;
  transition: var(--transition);

  & > svg {
    stroke: var(--textColor);
    width: 20px;
    height: 20px;
  }

  &:hover {
    border: 1px solid var(--textColor);
    opacity: 1;
    scale: 1.15;
  }

  @media (min-width: 768px) {
    width: 44px;
    height: 44px;
    bottom: 40px;
    right: 40px;
  }

  @media (min-width: 1280px) {
    bottom: 16px;
    right: 0;
  }
`;

export default StyledAddButton;
