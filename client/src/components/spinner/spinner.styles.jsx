import styled, { css } from 'styled-components';

export const SpinnerContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  background-color: rgba(208, 232, 240, 0.2);
  border: 3px solid transparent;
  border-radius: 50%;
  border-top-color: #00465f;
  animation: spin 1.5s ease-in-out infinite;

  &::before {
    content: '';
    position: absolute;
    width: 60px;
    height: 60px;
    width: 40px;
    height: 40px;
    border: 2px solid transparent;
    border-radius: 50%;
    border-left-color: #5c99af;
    animation: spin 1s ease-in-out infinite;
  }

  &::after {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    border: 4px solid transparent;
    border-radius: 50%;
    border-right-color: #b1d2de;
    animation: spin 2s ease-in-out infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const floatStyles = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(208, 232, 240, 0.4);
  z-index: 10;

  ${SpinnerContainer} {
    background-color: #d0e8f0;
  }
`;

const setFloat = ({ float }) => float && floatStyles;

export const SpinnerOverlay = styled.div`
  padding: 3em 1em;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  ${setFloat}
`;
