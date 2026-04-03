import styled from "styled-components";
import DateField from "./DateField";

const StyledDateField = styled(DateField)`
  .react-datepicker-wrapper {
    width: 100%;
    opacity: 0.4;
    transition: var(--transition);

    &:hover,
    &:has(+ .react-datepicker__tab-loop) {
      opacity: 1;
    }
  }

  .react-datepicker__input-container {
    > input {
      cursor: pointer;
      padding: 0 10px 8px 20px;
      border-bottom: 1px solid var(--textColor);
      font-weight: 400;
      font-size: 18px;
      line-height: 27px;
      font-family: var(--font-family-mono);
      font-variant-numeric: tabular-nums;
      color: var(--textColor);
      caret-color: transparent;
    }

    > svg {
      top: 0;
      right: 10px;
      pointer-events: none;
      padding: 0;
      width: 22px;
      height: 22px;
      fill: #734aef;
    }
  }

  .react-datepicker__day--disabled {
    cursor: not-allowed;
  }
`;

export default StyledDateField;
