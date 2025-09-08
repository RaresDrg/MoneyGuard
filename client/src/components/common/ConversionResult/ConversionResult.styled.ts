import styled from "styled-components";
import ConversionResult from "./ConversionResult";

const StyledConversionResult = styled(ConversionResult)`
  display: flex;
  margin-bottom: 95px;

  & {
    > :nth-child(1) {
      width: 60px;
      height: 60px;
      fill: #ffffff99;
      flex-shrink: 0;
    }

    > :nth-child(2) {
      font-weight: 600;
      font-size: 18px;
      line-height: 27px;
      color: var(--textColor);
      background-color: #ff868d33;
      backdrop-filter: blur(100px);
      border: 0.5px solid #ffffff80;
      border-radius: 12px;
      padding: 8.5px 17px;
      min-width: 91px;
      align-self: end;
      margin: 0 10px;
    }

    > :nth-child(3) {
      flex-shrink: 0;
      align-self: end;
      margin-bottom: 13px;
    }
  }
`;

export default StyledConversionResult;
