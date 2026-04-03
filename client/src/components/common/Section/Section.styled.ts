import styled from "styled-components";
import Section from "./Section";
import { getCloudinaryLQIP } from "../../../utils";

const StyledSection = styled(Section)`
  background-color: #101010;
  background-image: ${(props) =>
    props.backgrounds?.m
      ? `url(${getCloudinaryLQIP(`${props.backgrounds.m}_m_LQIP`)})`
      : "none"};
  background-repeat: no-repeat;
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
    background-image: ${(props) =>
      props.backgrounds?.t
        ? `url(${getCloudinaryLQIP(`${props.backgrounds.t}_t_LQIP`)})`
        : "none"};
  }

  @media (min-width: 1280px) {
    background-image: ${(props) =>
      props.backgrounds?.d
        ? `url(${getCloudinaryLQIP(`${props.backgrounds.d}_d_LQIP`)})`
        : "none"};
  }
`;

export default StyledSection;
