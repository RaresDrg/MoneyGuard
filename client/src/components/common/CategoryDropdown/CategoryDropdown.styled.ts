import styled from "styled-components";
import CategoryDropdown from "./CategoryDropdown";

const StyledCategoryDropdown = styled(CategoryDropdown)`
  position: relative;

  & {
    > div > button {
      background: transparent;
      border-radius: 0;
      padding: 0 20px 8px 20px;
      border: none;
      border-bottom: 1px solid var(--textColor);
      font-size: 18px;
      line-height: 27px;
      opacity: 0.4;
    }

    > div:has(+ p.error) > button {
      opacity: 1;
    }
  }
`;

export default StyledCategoryDropdown;
