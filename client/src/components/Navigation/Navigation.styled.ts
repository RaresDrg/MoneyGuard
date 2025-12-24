import styled from "styled-components";
import Navigation from "./Navigation";

const StyledNavigation = styled(Navigation)`
  display: flex;
  justify-content: center;
  gap: 38px;
  animation: fadeInDown 1s both;

  & > a {
    opacity: 0.4;
    transition: var(--transition);

    & {
      .icon {
        width: 38px;
        height: 38px;
        border-radius: 6px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: var(--textColor);
        transition: var(--transition);

        > svg {
          width: 27.33px;
          height: 23.22px;
          fill: #000000;
          transition: var(--transition);
        }
      }

      > span {
        display: none;
      }
    }
  }

  & > a.active {
    opacity: 1;
    cursor: not-allowed;

    .icon {
      background-color: #734aef;
      box-shadow: 0px 3px 10px 0px #4a56e280;

      > svg {
        fill: var(--textColor);
      }
    }
  }

  & > a:hover:not(.active) {
    opacity: 0.7;

    .icon > svg {
      fill: #734aef;
    }
  }

  @media (min-width: 768px) {
    flex-direction: column;
    gap: 12px;
    animation: fadeInLeft 1s both;

    & > a {
      display: flex;
      align-items: center;
      gap: 20px;
      width: fit-content;

      & {
        .icon {
          width: 24px;
          height: 24px;
          border-radius: 2px;

          > svg {
            width: 15px;
            height: 14px;
          }
        }

        > span {
          display: block;
          font-weight: 400;
          font-size: 18px;
          line-height: 27px;
          color: var(--textColor);
        }
      }
    }

    & > a.active > span {
      font-weight: 700;
    }
  }

  @media (min-width: 1280px) {
    margin-left: 24px;
  }
`;

export default StyledNavigation;
