import styled from "styled-components";
import DeleteButton from "./DeleteButton";

const StyledDeleteButton = styled(DeleteButton)`
  background: linear-gradient(
    96.76deg,
    #ffc727 -16.42%,
    #9e40ba 97.04%,
    #7000ff 150.71%
  );
  box-shadow: 1px 9px 15px 0px #00000033;
  width: 69px;
  height: 29px;
  border-radius: 18px;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  color: var(--textColor);
  opacity: 0.7;
  transition: var(--transition);

  &:hover {
    opacity: 1;
    transform: scale(1.05);
    border: 0.5px solid currentColor;
  }
`;

export default StyledDeleteButton;
