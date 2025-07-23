import styled from "styled-components";
import FormButton from "./FormButton";

const StyledFormButton = styled(FormButton)`
  display: block;
  width: 100%;
  height: 50px;
  border-radius: 20px;
  box-shadow: 1px 9px 15px 0px #00000033;
  text-transform: uppercase;
  font-weight: 400;
  font-size: 18px;
  letter-spacing: 1.8px;
  color: ${(props) =>
    props.variant === "white" ? "#623F8B" : "var(--textColor)"};
  background: ${(props) =>
    props.variant === "white"
      ? "#fcfcfc"
      : "linear-gradient(96.76deg, #ffc727 -16.42%, #9e40ba 97.04%, #7000ff 150.71%)"};
  transition: var(--transition);

  &:disabled {
    background: grey;
    opacity: 0.7;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    transform: scale(1.02);
    background-size: 200%;
    background-position: right center;
    background-image: ${(props) =>
      props.variant === "white"
        ? "linear-gradient(to right, rgb(255, 255, 255) 0%, rgb(98, 63, 139) 31%, rgb(255, 255, 255) 100%)"
        : "linear-gradient(to right, #ffb400 0%, #d660d4 50%,#6f30ff 100%)"};
    border: 1px solid var(--textColor);
    font-size: 20px;
    letter-spacing: 2px;
    transition: all 0.9s ease;
  }

  @media (min-width: 768px) {
    width: 300px;
    margin: 0 auto;
  }
`;

export default StyledFormButton;
