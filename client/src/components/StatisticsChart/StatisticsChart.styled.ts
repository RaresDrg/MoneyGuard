import styled from "styled-components";
import StatisticsChart from "./StatisticsChart";

const StyledStatisticsChart = styled(StatisticsChart)`
  margin: 0 auto;
  width: 280px;
  height: 280px;
  position: relative;

  & > span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 140px;
    text-align: center;
    font-weight: 600;
    font-size: 18px;
    line-height: 27px;
    color: var(--textColor);
  }

  .text-loader {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export default StyledStatisticsChart;
