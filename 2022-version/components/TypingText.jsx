import React, {useEffect, useState} from "react";
import styled from "styled-components";

const TypingText = () => {

  //TO DO: Convert function to get data from an array

  // I have no idea why useEffect causes the TypingText to work properly, I'll come back to this
  const [text, setText] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setText(true);
    }, 300);
  },[]);
  
  let wrapper;
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  async function writingAll(stringTarget, container) {
    wrapper = document.querySelector("[" + container + "]");
    const stringsContainer = document.getElementsByClassName(stringTarget);

    while (wrapper) {
      for (let i = 0; i < stringsContainer.length; i++) {
        const string = stringsContainer[i].textContent;
        await write(string);
        await sleep(1000);
        await erase();
        await sleep(1000);
      }
    }
  }

  async function write(text) {
    let index = 0;
    while (index < text.length) {
      const timeout = 100;
      await sleep(timeout);
      index++;
      wrapper.innerHTML = text.substring(0, index);
    }
  }

  async function erase() {
    while (wrapper.textContent.length) {
      const timeout = 100;
      await sleep(timeout);
      wrapper.textContent = wrapper.textContent.substring(
        0,
        wrapper.textContent.length - 2
      );
    }
  }

  writingAll("item", "data-text");

  return (
    <Wrapper>
      <div data-text></div>
      <span className="item">Software Engineer.</span>
      <span className="item">Full-Stack Developer.</span>
      <span className="item">Web Developer.</span>
      <span className="item">I love creating solutions with code.</span>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  font-weight: 200;
  font-size: 1rem;

  @media (min-width: 768px) {
    font-size: 1rem;
  }
  .item {
    visibility: hidden;
    display: none;
  }

  h2 {
    font-size: 50px;
    margin: 0;
    color: #9cb1bb;
    text-align: left;
  }

  > div {
    min-height: 20px;
    letter-spacing: 1px;
    display: flex;
    align-items: flex-end;
    font-weight: 200;
    color: #9cb1bb;

    &:after {
      content: "";
      width: 10px;
      height: 4px;
      display: block;
      background: #9cb1bb;
      color: #9cb1bb;
      margin-bottom: 1px;
      margin-left: 2px;
      animation-duration: 350ms;
      animation-name: fade;
      animation-direction: alternate;
      animation-iteration-count: infinite;
    }
  }
`;

export default TypingText;
