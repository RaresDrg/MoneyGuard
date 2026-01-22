import styled from "styled-components";
import Section from "./Section";
import { getCloudinaryLQIP } from "../../../utils";

const StyledSection = styled(Section)`
  background-color: #101010;
  background-image: ${(props) => {
    return props.backgrounds?.m === "none"
      ? "none"
      : `url(${getCloudinaryLQIP(
          `${props.backgrounds?.m ?? "gradientBg"}_m_LQIP`
        )})`;
  }};
  background-size: cover;
  background-position: center;
  min-width: 320px;
  height: 100%;
  overflow-y: auto;
  scrollbar-width: none;
  transition: background-image 1s ease-out;
  animation: sectionReveal 0.8s ease-out both;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: 768px) {
    background-image: ${(props) => {
      return props.backgrounds?.t === "none"
        ? "none"
        : `url(${getCloudinaryLQIP(
            `${props.backgrounds?.t ?? "gradientBg"}_t_LQIP`
          )})`;
    }};
  }

  @media (min-width: 1280px) {
    background-image: ${(props) => {
      return props.backgrounds?.d === "none"
        ? "none"
        : `url(${getCloudinaryLQIP(
            `${props.backgrounds?.d ?? "gradientBg"}_d_LQIP`
          )})`;
    }};
  }
`;

export default StyledSection;
