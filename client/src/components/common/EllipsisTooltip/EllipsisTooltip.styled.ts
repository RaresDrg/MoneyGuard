import styled from "styled-components";
import EllipsisTooltip from "./EllipsisTooltip";

const StyledEllipsisTooltip = styled(EllipsisTooltip)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
`;

export default StyledEllipsisTooltip;
