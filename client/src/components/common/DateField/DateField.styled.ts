import styled from "styled-components";
import DateField from "./DateField";

const StyledDateField = styled(DateField)`
  .react-datepicker-wrapper {
    width: 100%;
    border-bottom: 1px solid var(--textColor);
    padding: 0 20px 8px 20px;
    cursor: pointer;
    opacity: 0.4;
    transition: var(--transition);

    &:hover {
      opacity: 1;
    }

    &:has(+ .react-datepicker__tab-loop) {
      opacity: 1;
    }
  }

  .react-datepicker__input-container {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;

    > input {
      padding: 0;
      font-weight: 400;
      size: 18px;
      line-height: 27px;
      color: var(--textColor);
      cursor: pointer;
      caret-color: transparent;
    }

    > svg {
      position: static;
      padding: 0;
      width: 24px;
      height: 24px;
      fill: #734aef;
    }
  }

  .react-datepicker__day--disabled {
    cursor: not-allowed;
  }
`;

export default StyledDateField;
