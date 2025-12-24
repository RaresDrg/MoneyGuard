import styled from "styled-components";
import GoogleButton from "./GoogleButton";

const StyledGoogleButton = styled(GoogleButton)`
  width: 100%;
  height: 50px;
  border-radius: 20px;
  border: 1px solid #444444;
  background: var(--textColor);
  box-shadow: 1px 9px 15px 0px #00000033;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  transition: var(--transition);

  &:hover {
    background: #bab9be;
    border: 1px solid #000000;
    box-shadow: 0 1px 1px #0000001a;
  }

  & {
    svg {
      width: 30px;
      height: 30px;
    }

    span {
      font-weight: 400;
      font-size: 18px;
      line-height: 27px;
      color: #000000;
    }
  }
`;

export default StyledGoogleButton;
