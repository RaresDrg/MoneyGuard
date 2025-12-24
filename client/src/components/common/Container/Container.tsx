import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  padding: 0 20px;

  @media (min-width: 768px) {
    padding: 0 32px;
  }

  @media (min-width: 1280px) {
    margin: 0 auto;
    max-width: 1600px;
    padding: 0 24px;
  }
`;

export default Container;
