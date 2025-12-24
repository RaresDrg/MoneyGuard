import styled from "styled-components";
import SharedLayout from "./SharedLayout";

const StyledSharedLayout = styled(SharedLayout)`
  padding-bottom: 30px;
  position: relative;
  animation: fadeIn 1s both;

  & > div {
    padding-top: 15px;
    height: 100%;
    overflow-y: auto;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  @media (min-width: 768px) {
    padding: 40px 0 54px 0;

    & > div {
      display: grid;
      grid-template-columns: auto minmax(0, 1fr);
      grid-template-rows: auto minmax(0, 1fr);
      align-items: start;
      gap: 30px 100px;
      padding-top: 0px;
      padding-right: calc(32px - 8px);
      scrollbar-gutter: stable;
      scrollbar-width: auto;

      &::-webkit-scrollbar {
        display: unset;
        width: 8px;
        border-radius: 12px;
        background-color: #b0afc0;
        cursor: pointer;
      }
      &::-webkit-scrollbar-thumb {
        border-radius: 12px;
        background-color: #523b7e99;
        cursor: pointer;
      }

      & {
        > :nth-child(1) {
          grid-row: 1;
          grid-column: 1;
        }

        > :nth-child(2) {
          grid-row: 1;
          grid-column: 2;
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
      grid-template-columns: 360px minmax(0, 1fr);
      grid-template-rows: auto minmax(0, 1fr);
      gap: 30px 1px;
      padding: 40px 0 54px 0;
      position: relative;
      scrollbar-width: none;

      &::-webkit-scrollbar {
        display: none;
      }

      &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 360px;
        height: 100%;
        width: 1px;
        background-color: #ffffff66;
        box-shadow: 1px 4px 1px 0px #00000040;
      }

      & {
        > :nth-child(1) {
          grid-row: 1;
          grid-column: 1;
        }

        > :nth-child(2) {
          grid-row: 2;
          grid-column: 1;
        }

        > :nth-child(3) {
          grid-row: 1 / span 2;
          grid-column: 2;
          height: 100%;
          overflow-y: auto;
          scrollbar-gutter: stable;
          padding-right: calc(24px - 8px);
          padding-left: 70px;

          &::-webkit-scrollbar {
            width: 8px;
            border-radius: 12px;
            background-color: #b0afc0;
            cursor: pointer;
          }
          &::-webkit-scrollbar-thumb {
            border-radius: 12px;
            background-color: #523b7e99;
            cursor: pointer;
          }
        }
      }
    }
  }
`;

export default StyledSharedLayout;
