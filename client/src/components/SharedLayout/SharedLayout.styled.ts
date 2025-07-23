import styled from "styled-components";
import SharedLayout from "./SharedLayout";

const StyledSharedLayout = styled(SharedLayout)`
  height: calc(100dvh - 60px);
  min-width: 320px;
  padding: 15px 0 45px 0;

  & > div {
    overflow-y: auto;
  }

  @media (min-width: 768px) {
    height: calc(100dvh - 80px);
    padding: 40px 0 90px 0;

    & > div {
      display: grid;
      grid-template-columns: 127px minmax(0, 1fr);
      grid-template-rows: auto 1fr;
      align-items: start;
      column-gap: 100px;
      row-gap: 30px;
      scrollbar-gutter: stable;
      padding-right: calc(32px - 8px);

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

      & {
        > :nth-child(1) {
          grid-row: 1;
          grid-column: 1;
        }

        > :nth-child(2) {
          grid-row: 1;
          grid-column: 2;
          justify-self: end;
          width: 100%;
          min-width: 336px;
          max-width: fit-content;
        }

        > :nth-child(3) {
          grid-row: 2;
          grid-column: 1 / span 2;
        }
      }
    }
  }

  @media (min-width: 1280px) {
    padding: 0;

    & > div {
      grid-template-columns: 480px 1px 1fr;
      column-gap: 16px;
      padding-right: calc(16px - 8px);

      & {
        > :nth-child(1) {
          grid-row: 1;
          grid-column: 1;
          margin-top: 40px;
        }

        > :nth-child(2) {
          grid-row: 2;
          grid-column: 1;
          max-width: 100%;
        }

        > :nth-child(3).separator {
          grid-row: 1 / span 2;
          grid-column: 2;
          width: 1px;
          height: 100%;
          background-color: #ffffff99;
          box-shadow: 1px 4px 1px 0px #00000040;
        }

        > :nth-child(4) {
          grid-row: 1 / span 2;
          grid-column: 3;
          height: 100%;
          position: relative;
        }
      }
    }
  }
`;

export default StyledSharedLayout;
