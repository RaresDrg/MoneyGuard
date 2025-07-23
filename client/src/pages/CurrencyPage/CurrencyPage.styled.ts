import styled from "styled-components";
import CurrencyPage from "./CurrencyPage";

const StyledCurrencyPage = styled(CurrencyPage)`
  margin-top: 43px;

  & {
    > h2 {
      font-weight: 600;
      font-size: 30px;
      line-height: 45px;
      color: var(--textColor);
      margin-bottom: 15px;
    }

    > p.error {
      font-weight: 600;
      font-size: 16px;
      line-height: 24px;
      text-align: center;
      color: #623f8b;
      background-color: #fff3cd;
      border: 1px solid var(--errorColor);
      box-shadow: 0px 6px 15px 0px #ff868d80;
      border-radius: 8px;
      padding: 16px;
      max-width: fit-content;
      margin: 0 auto;
    }
  }

  @media (min-width: 768px) {
    margin-top: 0;
  }

  @media (min-width: 1280px) {
    padding: 32px 0 46px 53px;

    & > div {
      height: calc(100% - 65px);
      overflow: auto;
      padding-right: 16px;
      padding-bottom: 1px;
      scrollbar-gutter: stable;

      &::-webkit-scrollbar {
        width: 8px;
        border-radius: 12px;
        background-color: #e8e8e8;
        cursor: pointer;
      }
      &::-webkit-scrollbar-thumb {
        border-radius: 12px;
        background-color: #523b7e99;
        cursor: move;
      }
    }
  }
`;

export default StyledCurrencyPage;
