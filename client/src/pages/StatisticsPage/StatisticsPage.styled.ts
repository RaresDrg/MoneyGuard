import styled from "styled-components";
import StatisticsPage from "./StatisticsPage";

const StyledStatisticsPage = styled(StatisticsPage)`
  margin-top: 40px;

  & > div {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    justify-items: center;
    gap: 32px;

    & {
      .filters {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 20px;
      }

      .fallback {
        text-align: center;
      }
    }
  }

  @media (min-width: 768px) {
    margin-top: 0;

    & {
      .page-title {
        margin-bottom: 15px;
      }

      > div {
        grid-template-columns: auto minmax(0, 1fr);
        grid-template-rows: auto minmax(0, 1fr);
        gap: 20px 32px;

        & {
          > :nth-child(1) {
            grid-row: 1 / span 2;
            grid-column: 1;
          }

          > :nth-child(2) {
            grid-row: 1;
            grid-column: 2;
            flex-direction: row;
          }

          > :nth-child(3) {
            grid-row: 2;
            grid-column: 2;
          }
        }
      }
    }
  }
`;

export default StyledStatisticsPage;
