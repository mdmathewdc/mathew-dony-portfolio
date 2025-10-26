import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const LanguageTile = ({ name }) => {
  return (
    <StyledLanguageTile
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{
        type: "spring",
        bounce: 0.5,
        duration: 1.8,
        ease: "easeInOut",
        delay: 0.3,
      }}
      variants={{
        visible: { opacity: 1, scale: 1.1 },
        hidden: { opacity: 0, scale: 1 },
      }}
    >
      <img src={`/programming-language-logos/${name}.svg`} alt={name} />
      <span>{name}</span>
    </StyledLanguageTile>
  );
};

const StyledLanguageTile = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 2.5rem;
    height: 2.5rem;
  }

  span {
    font-size: 0.8rem;
    margin-top: 0.3rem;
    font-weight: 200;
    color: #9cb1bb;
    text-align: center;
  }
`;
export default LanguageTile;
