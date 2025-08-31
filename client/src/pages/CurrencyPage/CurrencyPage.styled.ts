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
      margin-bottom: 10px;
    }

    .fallback {
      font-weight: 600;
      font-size: 16px;
      line-height: 24px;
      text-align: center;
      color: var(--textColor);
      background-color: #ff868d33;
      backdrop-filter: blur(100px);
      box-shadow: 0px 6px 15px 0px #ff868d50;
      border: 0.5px solid #ffffff80;
      border-radius: 8px;
      padding: 16px;
      max-width: fit-content;
      margin: 0 auto;
    }
  }

  @media (min-width: 768px) {
    margin-top: 0;

    & > h2 {
      margin-bottom: 15px;
    }
  }

  @media (min-width: 1280px) {
    padding: 32px 0 20px 53px;
  }
`;

export default StyledCurrencyPage;
