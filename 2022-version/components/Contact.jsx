import React from "react";
import styled from "styled-components";
import { SectionHeader } from "./CommonStyles";
import Fade from "react-reveal/Fade";

const Contact = () => {
  return (
    <Fade big duration={1500} ssrReveal>
      <ContactContainer>
        <SectionHeader>
          <h2>Contact</h2>
          <span></span>
        </SectionHeader>
        <div>
          <p>I'm always open for a chat. You can connect me on:</p>
        </div>
        <LogosContainer>
          <a href="mailto:mathewdony007@gmail.com" target={"_blank"}>
            <img src="/social-logos/mail.svg" className="mail" />
          </a>
          <a href="https://github.com/mdmathewdc" target={"_blank"}>
            <img src="/social-logos/github-original.svg" />
          </a>
          <a href="https://www.linkedin.com/in/mathew-dony" target={"_blank"}>
            <img src="/social-logos/linkedin-plain.svg" />
          </a>
          <a
            href="https://www.discordapp.com/users/mdmathewdc#7892"
            target={"_blank"}
          >
            <img src="/social-logos/discord.svg" />
          </a>
        </LogosContainer>
      </ContactContainer>
    </Fade>
  );
};

const ContactContainer = styled.div`
  p {
    font-weight: 300;
    text-align: center;
    font-size: 0.9rem;
    color: #9cb1bb;
  }
`;

const LogosContainer = styled.div`
  display: flex;
  fill: white;
  height: 1.5rem;
  gap: 1rem;
  margin: 2rem 0;
  justify-content: center;

  img {
    height: 1.5rem;
    transition: transform 0.2s ease-in-out;

    &:hover {
      transform: scale(1.15);
    }
  }

  .instagram {
    height: 1.8rem;
    margin-top: -0.1rem;
  }

  .mail {
    height: 1.8rem;
    margin-top: -0.1rem;
  }
`;

export default Contact;
