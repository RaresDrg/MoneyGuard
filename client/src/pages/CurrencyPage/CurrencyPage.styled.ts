import styled from "styled-components";
import CurrencyPage from "./CurrencyPage";

const StyledCurrencyPage = styled(CurrencyPage)`
  margin-top: 40px;

  .fallback {
    margin: 15px auto 0 auto;
    font-weight: 500;
    text-align: center;
    color: var(--textColor);
    background: grey;
    box-shadow: 0px 4px 60px 0px #00000040;
    border: 0.5px solid #101010;
    border-radius: 8px;
    padding: 16px;
    max-width: fit-content;
    animation: fadeInUp 1s 0.2s both;
  }

  @media (min-width: 768px) {
    margin-top: 0;
  }
`;

export default StyledCurrencyPage;
