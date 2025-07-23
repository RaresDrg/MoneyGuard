import styled from "styled-components";
import DashboardPage from "./DashboardPage";

const StyledDashboardPage = styled(DashboardPage)`
  margin-top: 43px;

  & {
    > h2 {
      font-weight: 600;
      font-size: 30px;
      line-height: 45px;
      color: var(--textColor);
      margin-bottom: 10px;
    }

    > p {
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
      font-style: italic;
      color: #ffffff99;
      margin-top: 20px;
    }
  }

  @media (min-width: 768px) {
    margin-top: 0;

    & > p {
      margin-top: 0;
    }
  }

  @media (min-width: 1280px) {
    padding: 32px 0 65px 53px;
  }
`;

export default StyledDashboardPage;
