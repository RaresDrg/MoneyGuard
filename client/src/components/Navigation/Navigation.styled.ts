import styled from "styled-components";
import Navigation from "./Navigation";

const StyledNavigation = styled(Navigation)`
  display: flex;
  justify-content: center;
  gap: 38px;

  & {
    a {
      opacity: 0.4;
      transition: var(--transition);

      & {
        > div.icon {
          width: 38px;
          height: 38px;
          border-radius: 6px;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: var(--textColor);
          transition: var(--transition);

          & {
            svg {
              width: 27.33px;
              height: 23.22px;
              fill: #000000;
              transition: var(--transition);
            }
          }
        }

        > span {
          display: none;
        }
      }
    }

    a.active {
      opacity: 1;
      cursor: not-allowed;

      & > div.icon {
        background-color: #734aef;
        box-shadow: 0px 3px 10px 0px #4a56e280;
      }

      & > div.icon > svg {
        fill: var(--textColor);
      }
    }

    a:hover:not(.active) {
      opacity: 0.7;

      & > div.icon > svg {
        fill: #734aef;
      }
    }
  }

  @media (min-width: 768px) {
    display: inline-flex;
    flex-direction: column;
    gap: 12px;

    & {
      a {
        display: flex;
        align-items: center;
        gap: 20px;

        & {
          > div.icon {
            width: 20px;
            height: 20px;
            border-radius: 2px;

            & {
              svg {
                width: 15px;
                height: 14px;
              }
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

      a.active > span {
        font-weight: 700;
      }
    }
  }
`;

export default StyledNavigation;
