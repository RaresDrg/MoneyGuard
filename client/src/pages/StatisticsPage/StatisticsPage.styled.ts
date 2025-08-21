import styled from "styled-components";
import StatisticsPage from "./StatisticsPage";

const StyledStatisticsPage = styled(StatisticsPage)`
  margin-top: 43px;

  & > h2 {
    font-weight: 600;
    font-size: 30px;
    line-height: 45px;
    color: var(--textColor);
    margin-bottom: 10px;
  }

  @media (min-width: 768px) {
    margin-top: 0;

    & > h2 {
      margin-bottom: 15px;
    }
  }

  @media (min-width: 1280px) {
    padding: 32px 0 46px 53px;
  }
`;

export default StyledStatisticsPage;
