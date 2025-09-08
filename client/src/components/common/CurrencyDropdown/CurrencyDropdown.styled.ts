import styled from "styled-components";
import CurrencyDropdown from "./CurrencyDropdown";

const StyledCurrencyDropdown = styled(CurrencyDropdown)`
  &:has(> button, > ul) {
    button {
      font-size: 18px;
      line-height: 27px;
      opacity: 0.4;
    }

    ul {
      background: #523b7e;
    }
  }
`;

export default StyledCurrencyDropdown;
