import styled from 'styled-components';

import { Link } from 'react-router-dom';

export const HomePageOverlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: calc(100vh - 80px);
  padding: 0 2em;
  overflow: hidden;
`;

export const LinkTitle = styled(Link)`
  display: block;
  font-size: 40px;
  font-weight: bold;
  margin: 0 0 5em 0;
  position: relative;
  text-align: center;
  color: #00465f;
  transition: color 0.2s ease-in-out;

  &:hover,
  &:focus {
    color: #333;

    &::after {
      background-color: #00465f;
    }
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    width: 0;
    height: 2px;
    background-color: #5c99af;
    transform: translateX(-50%);
    transition: background-color 0.2s ease-in-out;
    animation: underline 2.5s infinite;
  }

  @media screen and (max-width: 800px) {
    font-size: 32px;
  }

  @keyframes underline {
    0% {
      width: 0;
    }
    50% {
      width: 100%;
    }
    100% {
      width: 0;
    }
  }
`;
