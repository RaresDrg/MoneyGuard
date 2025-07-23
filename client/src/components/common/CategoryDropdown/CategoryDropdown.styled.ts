import styled from "styled-components";
import CategoryDropdown from "./CategoryDropdown";

const StyledCategoryDropdown = styled(CategoryDropdown)`
  &.onError {
    > div > button {
      opacity: 1;
    }

    .error {
      margin-top: 2px;
      margin-left: 10px;
      font-weight: 600;
      font-size: 14px;
      color: var(--errorColor);
    }
  }

  & > div > button {
    background: transparent;
    border-radius: 0;
    padding: 0 20px 8px 20px;
    border: none;
    border-bottom: 1px solid var(--textColor);
    font-size: 18px;
    line-height: 27px;
    opacity: 0.4;
  }
`;

export default StyledCategoryDropdown;
