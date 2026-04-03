import styled from "styled-components";
import HomePage from "./HomePage";

const StyledHomePage = styled(HomePage)`
  & > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    min-height: fit-content;
    background: linear-gradient(to bottom, #0f0f0f99, #10101033);
    padding: 20px;

    & {
      > a:nth-of-type(1) {
        animation: fadeInDown 0.6s both;
      }

      .hero-text {
        margin: 52px 0 80px 0;
        font-weight: 400;
        font-size: 16px;
        line-height: 24px;
        letter-spacing: 0.5px;
        color: var(--textColor);
        text-align: center;
        text-shadow: 2px 2px 5px black;
        background: #ffffff33;
        -webkit-backdrop-filter: blur(20px);
        backdrop-filter: blur(20px);
        box-shadow:
          0px 4px 60px 0px #00000040,
          inset 0 0 100px #00000040;
        border: 0.5px solid #ffffff4d;
        border-radius: 8px;
        padding: 16px;
        animation: flipInX 1s ease-in-out both;
      }

      .auth-group {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;

        & {
          .cta {
            width: 100%;
            height: 50px;
            border-radius: 20px;
            border: 0.5px solid #b0afc0;
            background: linear-gradient(135deg, #5e3a7f, #e88fb0);
            background-size: 100% 100%;
            background-position: center;
            box-shadow: 1px 9px 15px 0px #00000033;
            font-weight: 400;
            font-size: 18px;
            letter-spacing: 0.5px;
            color: var(--textColor);
            margin-bottom: 16px;
            transition: var(--transition);
            animation: fadeInUp 0.6s 0.2s backwards;

            &:hover,
            &:focus-visible {
              transform: translateY(-2px) scale(1.02);
              box-shadow: 0 0 12px #edc0d766;
              border: 1px solid var(--textColor);
              letter-spacing: 1px;
              background-size: 200% 200%;
              background-position: right center;
            }
          }

          .login-prompt {
            animation: fadeInUp 0.6s 0.4s both;

            & {
              > span:nth-of-type(1),
              > span:nth-of-type(2) {
                font-weight: 400;
                font-size: 14px;
                line-height: 21px;
                color: var(--textColor);
                text-shadow: 2px 2px 2px black;
              }

              > span:nth-of-type(1) {
                opacity: 0.9;
              }

              > span:nth-of-type(2) {
                display: flex;
                align-items: center;
                gap: 12px;
                margin-top: 24px;
                margin-bottom: 16px;

                &::before,
                &::after {
                  content: "";
                  flex: 1;
                  height: 1px;
                  background-color: #ffffff66;
                }
              }

              .login-btn {
                font-weight: 600;
                font-size: 14px;
                line-height: 21px;
                color: #ffd8d0;
                text-shadow: 2px 2px 2px black;
                margin-left: 5px;
                position: relative;

                &:after {
                  content: "";
                  background-color: currentColor;
                  position: absolute;
                  bottom: -2px;
                  right: 0;
                  height: 1px;
                  width: 0;
                  opacity: 0;
                  transition: var(--transition);
                }

                &:hover:after,
                &:focus-visible:after {
                  width: 100%;
                  opacity: 1;
                  left: 0;
                }
              }
            }
          }

          > :nth-child(3) {
            animation: fadeInUp 0.6s 0.6s both;
          }
        }
      }
    }
  }

  @media (min-width: 768px) {
    & > div {
      padding: 50px;

      & {
        .hero-text {
          font-size: 18px;
          line-height: 27px;
          letter-spacing: 0.75px;
          text-shadow: 3px 3px 6px black;
          border-radius: 12px;
          padding: 24px;
          width: 565px;
        }

        .auth-group {
          width: 340px;

          & {
            .login-prompt {
              & {
                > span:nth-of-type(1),
                > span:nth-of-type(2),
                .login-btn {
                  font-size: 16px;
                  line-height: 24px;
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default StyledHomePage;
