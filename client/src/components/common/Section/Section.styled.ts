import styled from "styled-components";
import Section from "./Section";
import { getBackgroundPath } from "../../../utils";

const StyledSection = styled(Section)`
  height: 100dvh;
  overflow: auto;
  background-image: url(${getBackgroundPath("gradientBg_mobile")});
  background-size: cover;
  background-color: #101010;
  display: flex;

  &::-webkit-scrollbar {
    width: 0px;
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: transparent;
  }

  @media (min-width: 768px) {
    padding: 50px 0;
    background-image: ${(props) =>
      `url(${getBackgroundPath(`${props.variant}_tablet`)})`};
  }

  @media (min-width: 1280px) {
    background-image: ${(props) =>
      `url(${getBackgroundPath(`${props.variant}_desktop`)})`};
  }

  /* 2X Retina */
  @media (min-device-pixel-ratio: 2),
    (-webkit-min-device-pixel-ratio: 2),
    (min-resolution: 192dpi),
    (min-resolution: 2dppx) {
    background-image: url(${getBackgroundPath("gradientBg_mobile_2x")});

    @media (min-width: 768px) {
      background-image: ${(props) =>
        `url(${getBackgroundPath(`${props.variant}_tablet_2x`)})`};
    }

    @media (min-width: 1440px) {
      background-image: ${(props) =>
        `url(${getBackgroundPath(`${props.variant}_desktop_2x`)})`};
    }
  }
`;

export default StyledSection;
