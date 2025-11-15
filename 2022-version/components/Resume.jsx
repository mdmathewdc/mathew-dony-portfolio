import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { SectionHeader } from "./CommonStyles";
import { JobTab } from ".";
import Fade from "react-reveal/Fade";
import { HYGRAPH_PERMANENTAUTH_TOKEN, HYGRAPH_URL } from "./constants/Hygraph";

const Resume = () => {
  const [jobData, setJobData] = useState(null);

  useEffect(() => {
    const fetchJobData = async () => {
      const headers = {
        "content-type": "application/json",
        Authorization: `Bearer ${HYGRAPH_PERMANENTAUTH_TOKEN}`,
      };
      const requestBody = {
        query: `{
          jobs {
            name
            role
            time
            url
            description
          }
        }`,
      };
      const options = {
        method: "POST",
        headers,
        body: JSON.stringify(requestBody),
      };
      const response = await (await fetch(HYGRAPH_URL, options)).json();
      setJobData(response?.data?.jobs);
    };

    fetchJobData();
  }, []);
  return (
    <Fade big duration={1500} ssrReveal>
      <ResumeContainer id="resume-section">
        <SectionHeader>
          <h2>Where I've Worked</h2>
          <span></span>
        </SectionHeader>
        {jobData && <JobTab data={jobData} />}
      </ResumeContainer>
    </Fade>
  );
};

const ResumeContainer = styled.div`
  min-height: 95vh;
  scroll-margin-top: 1rem;
`;

export default Resume;
