import React from "react";
import styled from "styled-components";
import { SectionHeader } from "./CommonStyles";
import { languages } from "./constants/ProgrammingLanguages";
import LanguageTile from "./LanguageTile";
import Fade from "react-reveal/Fade";

const Technologies = () => {
  return (
    <Fade big duration={1500} ssrReveal>
      <TechnologyContainer>
        <SectionHeader>
          <h2>My Tech Stack</h2>
          <span></span>
        </SectionHeader>
        <LanguageTilesContainer>
          {languages.map((language, index) => (
            <LanguageTile name={language} key={index} />
          ))}
        </LanguageTilesContainer>
      </TechnologyContainer>
    </Fade>
  );
};

const TechnologyContainer = styled.div`
  min-height: max-content;
  
  @media (min-width: 1024px) {
    margin-bottom: 5rem;
  }
`;

const LanguageTilesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(4rem, 1fr));
  gap: 1rem;
  row-gap: 2rem;

  @media (min-width: 768px) {
    row-gap: 3rem;
  }
`;

export default Technologies;
