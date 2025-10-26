import styled from "styled-components";

export const SectionHeader = styled.div`
  display: flex;
  align-items: baseline;
  padding: 2rem 0;
  line-height: 1;

  h2 {
    font-size: 1.1rem;
    font-weight: 400;
    margin: 0 0.3rem 0 0;
  }
  span {
    flex-grow: 1;
    font-size: 3.5rem;
    margin-left: 0.1rem;
    border-bottom: 1px solid;
    border-image: linear-gradient( 90deg,#ff0000 0%,#8b2dca 50%,#3c9ec0 100% );
    border-image-slice: 1;
  }
`;
