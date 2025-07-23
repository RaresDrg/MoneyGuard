import styled from "styled-components";
import StatisticsPage from "./StatisticsPage";

const StyledStatisticsPage = styled(StatisticsPage)`
  margin-top: 43px;

  & {
    > h2 {
      font-weight: 600;
      font-size: 30px;
      line-height: 45px;
      color: var(--textColor);
    }

    > div {
      margin-top: 10px;
      display: grid;
      grid-template-columns: 1fr;
      gap: 32px;

      & > .dropdowns {
        display: flex;
        flex-direction: column;
        gap: 20px;
      }
    }
  }

  @media (min-width: 768px) {
    margin-top: 0;

    & > div {
      margin-top: 20px;
      grid-template-columns: 336px 1fr;
      grid-template-rows: min-content 1fr;
      gap: 20px 32px;

      & {
        > :nth-child(1) {
          width: 336px;
          height: 336px;
          position: sticky;
          top: 0;
          left: 0;
          grid-row: 1 / span 2;
          grid-column: 1;
        }

        > :nth-child(2) {
          grid-row: 1;
          grid-column: 2;
          flex-direction: row;

          & > div {
            flex: 1;
          }
        }

        > :nth-child(3) {
          grid-row: 2;
          grid-column: 2;
        }
      }
    }
  }

  @media (min-width: 1280px) {
    padding: 32px 0 46px 53px;

    & > div {
      height: calc(100% - 65px);
      overflow: auto;
      padding-right: 16px;
      scrollbar-gutter: stable;
      grid-template-columns: 288px 1fr;

      & > :nth-child(1) {
        width: 288px;
        height: 288px;
      }

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

export default StyledStatisticsPage;
