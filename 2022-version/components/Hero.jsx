import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { TypingText } from ".";
import Loader from "./Loader";
import Fade from "react-reveal/Fade";

const Hero = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  return (
    <HeroContainer>
      {isLoading ? (
        <Fade when={isLoading}>
          <Loader />
        </Fade>
      ) : (
        <Fade big duration={2000} ssrReveal>
          <section>
            <h1 className="hi">Hi,</h1>
            <h1 className="name-block">
              I'm <span className="my-name">Mathew Dony</span>
            </h1>
            <TypingText/>
            <LogosContainer className="logos-container">
              <a href="https://github.com/mdmathewdc" target={"_blank"}>
                <img src="/social-logos/github-original.svg" />
              </a>
              <a
                href="https://www.linkedin.com/in/mathew-dony"
                target={"_blank"}
              >
                <img src="/social-logos/linkedin-plain.svg" />
              </a>
            </LogosContainer>
          </section>
        </Fade>
      )}
    </HeroContainer>
  );
};

const HeroContainer = styled.div`
  min-height: 100vh;
  color: #fff;
  font-size: 1.3rem;

  section {
    padding-top: 25vh;
  }

  .name-block {
    font-weight: 500;
  }

  .my-name {
    font-family: "Inter", sans-serif;
    background-image: linear-gradient(
      90deg,
      #ff0000 0%,
      #8b2dca 50%,
      #3c9ec0 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`;

const LogosContainer = styled.div`
  display: flex;
  fill: white;
  height: 1.5rem;
  gap: 1rem;
  margin-top: 3rem;

  img {
    height: 1.5rem;
    transition: transform 0.2s ease-in-out;

    &:hover {
      transform: scale(1.15);
    }
  }
`;

export default Hero;
