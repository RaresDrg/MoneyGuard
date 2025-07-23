import styled from "styled-components";

const Container = styled.div`
  min-width: 320px;
  width: 100%;
  margin: 0 auto;
  padding-left: 20px;
  padding-right: 20px;

  @media (min-width: 768px) {
    padding-left: 32px;
    padding-right: 32px;
  }

  @media (min-width: 1280px) {
    padding-left: 16px;
    padding-right: 16px;
    max-width: 1600px;
  }
`;

export default Container;
