import React from "react";
import styled from "styled-components";
import { SectionHeader } from "./CommonStyles";
import ProjectTile from "./ProjectTile";
import Fade from "react-reveal/Fade";

const Projects = () => {
  return (
    <Fade big duration={1500} ssrReveal>
      <ProjectContainer>
        <SectionHeader>
          <h2>Some Things I've Built</h2>
          <span></span>
        </SectionHeader>
        <ProjectTile />
      </ProjectContainer>
    </Fade>
  );
};

const ProjectContainer = styled.div``;

export default Projects;
