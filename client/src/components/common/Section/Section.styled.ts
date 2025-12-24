import styled from "styled-components";
import Section from "./Section";
import { getCloudinaryImage } from "../../../utils";

const StyledSection = styled(Section)`
  background-color: #101010;
  background-image: image-set(
    url(${getCloudinaryImage("gradientBg_m_1x")}) 1x,
    url(${getCloudinaryImage("gradientBg_m_2x")}) 2x
  );
  background-size: cover;
  background-position: center;
  min-width: 320px;
  height: 100%;
  overflow-y: auto;
  scrollbar-width: none;
  animation: sectionReveal 0.8s ease-out both;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: 768px) {
    background-image: image-set(
      url(${getCloudinaryImage("gradientBg_t_1x")}) 1x,
      url(${getCloudinaryImage("gradientBg_t_2x")}) 2x
    );
  }

  @media (min-width: 1280px) {
    background-image: image-set(
      url(${getCloudinaryImage("gradientBg_d_1x")}) 1x,
      url(${getCloudinaryImage("gradientBg_d_2x")}) 2x
    );
  }
`;

export default StyledSection;
