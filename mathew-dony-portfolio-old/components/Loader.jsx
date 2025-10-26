import React from "react";
import styled from "styled-components";

const Loader = () => {
  return (
    <LoaderWrapper>
      <div className="container">
        <div className="red"></div>
        <div className="magenta"></div>
        <div className="purple"></div>
        <div className="blue"></div>
      </div>
    </LoaderWrapper>
  );
};

const LoaderWrapper = styled.div`

	display: flex;
	justify-content: center;
	margin-top: 40vh;
	z-index: 3;
	
  div.container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  div > div {
    width: 13px;
    height: 13px;
    border-radius: 100%;
    margin: 2vw;
    animation: bounce 2s 0.5s linear infinite;
  }
	
  .red {
    background-color: #f30818;
  }

  .magenta {
    background-color: #b72587;
    animation-delay: 0.1s;
  }

  .purple {
    background-color: #7b51c7;
    animation-delay: 0.2s;
  }

  .blue {
    background-color: #4795c1;
    animation-delay: 0.3s;
  }

  @keyframes bounce {
    0%,
    50%,
    100% {
      transform: scale(1);
      filter: blur(0px);
    }
    25% {
      transform: scale(0.6);
      filter: blur(3px);
    }
    75% {
      filter: blur(3px);
      transform: scale(1.4);
    }
  }
`;

export default Loader;
